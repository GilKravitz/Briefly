import logging
import time
import traceback
import backoff
from ratelimit import limits, RateLimitException
from typing import List, Dict, Any
import google.generativeai as genai
from ai_text_proccesing import ai_text_processor

class ArticleProcessor:
    MAX_TOKENS_PER_CLUSTER = 9000          # Max number of token be able to send the api
    MAX_NUMBER_OF_WORDS = 3000
    MAX_REQUESTS_PER_MINUTE = 4
    SUMMERY_AI_MODEL = "gemini-1.0-pro-001"

    PROMPT = '''summerize the following articles into a single - article summery.
    write the summery in hebrew as you are the journalist with 380 words maximum, do not reffer the article in Third person .
    the summary structure follows standard article formatting with paragraphs 
    Summarize the article by highlighting its main points, arguments, and conclusions.
    Include significant data, quotes, or statistics, noting their context.
    If the article covers multiple perspectives or debates, outline them distinctly.
    Also, mention any implications or recommendations made by the author.
    Identify specific events, individuals, or sources referenced in the article and explain their relevance to the overall message.
    Please return JSON describing the the article_body, title, and hashtags from this articles using the following schema:
    {"article_body": string, "title":string, "hashtags":list[string]}'''

    def __init__(self, api_key: str):
        """
        Initializes the ArticleProcessor with API credentials and configuration for clustering and summarization.

        Args:
            api_key (str): The API key for accessing OpenAI's services.
            similarity_threshold (float): The threshold for determining cluster cutoff in similarity scoring.
            encoding_name (str): The name of the encoding model used for tokenizing text.
            linkage (str): The linkage criterion to use for clustering (e.g., 'average', 'complete').
        """
        genai.configure(api_key=api_key)

        # Set up the model
        generation_config = {
            "temperature": 0.75,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE"
            },
        ]

        self.logger = logging.getLogger(__name__)
        self.logger.info(f"ArticleProcessor initialized with AI summery model: " + self.SUMMERY_AI_MODEL)

        self.model = genai.GenerativeModel(model_name=self.SUMMERY_AI_MODEL,
                                    generation_config=generation_config,
                                    safety_settings=safety_settings)
        
        self.convorsation = self.model.start_chat()

    
    @backoff.on_exception(backoff.expo,RateLimitException,max_tries=10,max_time=300)
    @limits(calls=MAX_REQUESTS_PER_MINUTE, period=60)
    def __summarize_cluster_gimini(self, cluster: List[Dict[str, Any]], cluster_index: int) -> Dict[str, Any]:
        """
        Summarizes a cluster of articles using the OpenAI API, by combining all articles in the cluster into one text.

        Args:
            cluster (List[Dict[str, Any]]): A list of articles in the cluster to be summarized.

        Returns:
            Dict[str, Any]: A dictionary containing the summary, category, and title of the cluster.
        """
        cluster_string = " ".join(f'article number {i}:\n' + article['data'] for i,article in enumerate(cluster))
        cluster_category = cluster[0]['category'] if cluster else None
        cluster_title = cluster[0]['title'] if cluster else None
        cluster_published_date = cluster[0]['publish_date'] if cluster else None
        cluster_links = " ".join(article['link'] for article in cluster)
        cluster_ids_of_articles = [article['id'] for article in cluster]

        if len(cluster_ids_of_articles) > 1:
            logging.debug("Article ids: {} were merged into one cluster".format(cluster_ids_of_articles))
        
        try:
            # makes sure that the cluster contains amount of words that is acceptable by the api
            tokens_in_message = self.model.count_tokens(self.PROMPT + cluster_string).total_tokens
            if(tokens_in_message > self.MAX_TOKENS_PER_CLUSTER):
                words = cluster_string.split()[:self.MAX_NUMBER_OF_WORDS]
                cluster_string = " ".join(words)
            
            self.convorsation.send_message(self.PROMPT + cluster_string)

            logging.debug("Summarizing cluster number {} with article IDs: {}".format(cluster_index, ", ".join(map(str, cluster_ids_of_articles))))

            full_detailed_summary = {
                'links': cluster_links,
                'publish_date': cluster_published_date,
                'title': cluster_title,
                'category': cluster_category,
                'data': self.convorsation.last.text,
                'ids': cluster_ids_of_articles}
            
            #TODO debug the summary 
            self.write_summary_to_file(full_detailed_summary, "summeries.txt", cluster_index)
            
            return full_detailed_summary
        except Exception as e:
            logging.error(f"Failed to summarize cluster due to: {str(e)}")
            self.convorsation = self.model.start_chat()
            return None
    
    def process_articles(self, articles: List[Dict[str, Any]], similarity_matrix: List[List[float]]) -> List[Dict[str, Any]]:
        """
        Processes a list of articles by clustering and summarizing them.

        Args:
            articles (List[Dict[str, Any]]): The articles to process.
            similarity_matrix (List[List[float]]): The similarity matrix for clustering.

        Returns:
            List[Dict[str, Any]]: A list of summarized articles.
        """
        if len(articles) < 2:  
            ### handel for one summerizer
            # edge case: not able to cluster articles while there is less then 2 articles
            return None
        
        self.logger.info("Clustering articles based on similarity matrix.")
        clusters = ai_text_processor.AiTextProcessor.make_clusters(similarity_matrix, articles)

        #TODO:debuging clusters to text file remove
        self.write_clusters_to_file(clusters, "clusters.txt")

        self.logger.info("summerizing clusters.")
        summaries = [self.__summarize_cluster_gimini(cluster, i) for i,cluster in enumerate(clusters)]
        #summaries = self.__summery_all_clusters(clusters)
        return summaries
    
    def __summery_all_clusters(self, clusters: List[List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
        """
        Summarizes all clusters of articles, sending requests in batches with rate limiting.

        Args:
            clusters (List[List[Dict[str, Any]]]): A list of clusters, where each cluster is a list of article dictionaries.

        Returns:
            List[Dict[str, Any]]: A list of summarized articles.
        """
        summaries = []
        for i in range(0, len(clusters), self.MAX_REQUESTS_PER_MINUTE):
            batch_clusters = clusters[i:i+self.MAX_REQUESTS_PER_MINUTE]
            batch_summaries = [self.__summarize_cluster_gimini(cluster) for cluster in batch_clusters]
            summaries.extend(batch_summaries)
            if i + self.MAX_REQUESTS_PER_MINUTE < len(clusters):
                time.sleep(60)  ######################################### sleep to remove after model improvment
        return summaries

    def __clusters_to_text(self, clusters: List[Dict[str, Any]]) -> str:
        text = ""
        for i, cluster in enumerate(clusters):
            text += f"-----Cluster {i}-----\n"
            for j, article in enumerate(cluster):
                if article:
                    text += f"article number {j} in cluster i"
                    text += str(article['id']) + "\n"
                    text += str(article['publish_date']) + "\n"
                    text += str(article['link']) + "\n"
                    text += str(article['category']) + "\n"
                    text += str(article['title']) + "\n"
                    text += str(article['data']) + "\n\n"
            text += "\n"
        return text

    def write_clusters_to_file(self, clusters: List[Dict[str, Any]], filename: str) -> None:
        text = self.__clusters_to_text(clusters)
        with open(filename, "w", encoding="utf-8") as file:
            file.write(text)

    def write_summary_to_file(self, summary: List[Dict[str, Any]], filename: str, summery_index: int) -> None:
        with open(filename, 'a', encoding="utf-8") as file:
            file.write(f"-----Cluster {summery_index}-----\n")
            if summary:
                file.write(summary['data'])
            file.write("\n")