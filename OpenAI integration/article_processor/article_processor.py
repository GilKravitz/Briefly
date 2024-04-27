from sklearn.cluster import AgglomerativeClustering
from openai import OpenAI
import tiktoken
from typing import List, Dict, Any
import google.generativeai as genai

class ArticleProcessor:
    # MAX_TOKENS = 15000  # Max number of token be able to send the api
    SUMMERY_AI_MODEL = "gemini-1.0-pro"
    PROMPT = '''Summarize the following article,
    into a Hebrew article as if you are the writter of the article,
    do not summarize into points, 
    the summary should not exceed 500 words,
    focusing on the main points, arguments, and conclusions.
    Highlight any significant data, quotes, or statistics mentioned,
    and note the context in which they are presented. 
    If the article discusses multiple perspectives or debates,
    please outline these distinctly. Additionally,
    if there are any implications or recommendations made by the author,
    include these in the summary.
    if the article references specific events, individuals, or sources, 
    please identify these and their relevance to the article's overall message.
    pay attention to correct syntax and grammar in English:\n'''

    def __init__(self, api_key: str, similarity_threshold: float):
        """
        Initializes the ArticleProcessor with API credentials and configuration for clustering and summarization.

        Args:
            api_key (str): The API key for accessing OpenAI's services.
            similarity_threshold (float): The threshold for determining cluster cutoff in similarity scoring.
            encoding_name (str): The name of the encoding model used for tokenizing text.
            linkage (str): The linkage criterion to use for clustering (e.g., 'average', 'complete').
        """
        self.__similarity_threshold = similarity_threshold
        genai.configure(api_key=api_key)

        # Set up the model
        generation_config = {
            "temperature": 1,
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

        self.model = genai.GenerativeModel(model_name=self.SUMMERY_AI_MODEL,
                                    generation_config=generation_config,
                                    safety_settings=safety_settings)
        
        self.convorsation = self.model.start_chat()

    def __make_clusters(self, similarity_matrix: List[List[float]], articles: List[Dict[str, Any]]) -> List[List[Dict[str, Any]]]:
        """
        Groups articles into clusters based on a similarity matrix and a pre-defined similarity threshold.

        Args:
            similarity_matrix (List[List[float]]): A matrix representing the pairwise similarities between articles.
            articles (List[Dict[str, Any]]): A list of articles, where each article is a dictionary.

        Returns:
            List[List[Dict[str, Any]]]: A list of clusters, each cluster being a list of article dictionaries.
        """

        clustering_model = AgglomerativeClustering(n_clusters=None, distance_threshold= self.__similarity_threshold, linkage='average')
        clusters = clustering_model.fit_predict(similarity_matrix)
        clustered_articles = [[] for _ in range(len(set(clusters)))]
        
        for i in range(len(articles)):
            # Append each article to its corresponding cluster based on the cluster assignment.
            # The 'articles[i]' part assumes there's an 'articles' list available in the scope where each article's index corresponds to its position in the similarity matrix.
            clustered_articles[clusters[i]].append({'publish_date': articles[i]['publish_date'],'link': articles[i]['link'],'data': articles[i]['data'],'category': articles[i]['category'],'title': articles[i]['title']})

        return clustered_articles
    
    def __summarize_cluster_gimini(self, cluster: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Summarizes a cluster of articles using the OpenAI API, by combining all articles in the cluster into one text.

        Args:
            cluster (List[Dict[str, Any]]): A list of articles in the cluster to be summarized.

        Returns:
            Dict[str, Any]: A dictionary containing the summary, category, and title of the cluster.
        """
        cluster_string = " ".join(article['data'] for article in cluster)
        cluster_category = cluster[0]['category'] if cluster else None
        cluster_title = cluster[0]['title'] if cluster else None
        cluster_published_date = cluster[0]['publish_date'] if cluster else None
        cluster_links = ''

        for article in cluster:
            cluster_links += article['link']
            cluster_links += ' '

        self.convorsation.send_message(self.PROMPT + cluster_string)

        full_detailed_summary = {'links': cluster_links,'publish_date': cluster_published_date,'title': cluster_title,'category': cluster_category, 'data': self.convorsation.last.text}
        
        return full_detailed_summary
    
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
            # edge case: not able to cluster articles while there is less then 2 articles
            return None
        
        clusters = self.__make_clusters(similarity_matrix, articles)
        self.write_clusters_to_file(clusters, "output clusters.txt")
        summaries = [self.__summarize_cluster_gimini(cluster) for cluster in clusters]
        self.write_summaries_to_file(summaries, "output summeries.txt")
        return summaries

    def __clusters_to_text(self, clusters: List[Dict[str, Any]]) -> str:
        text = ""
        for i, cluster in enumerate(clusters):
            text += f"-----Cluster {i}-----\n"
            for article in cluster:
                text += article['data'] + "\n\n"
            text += "\n"
        return text

    def write_clusters_to_file(self, clusters: List[Dict[str, Any]], filename: str) -> None:
        text = self.__clusters_to_text(clusters)
        with open(filename, "w", encoding="utf-8") as file:
            file.write(text)

    def write_summaries_to_file(self, summaries: List[Dict[str, Any]], filename: str) -> None:
        with open(filename, 'w', encoding="utf-8") as file:
            for i, summary in enumerate(summaries):
                file.write(f"-----Cluster {i}-----\n")
                file.write(summary['data'])
                file.write("\n")
