from sklearn.cluster import AgglomerativeClustering
from openai import OpenAI
import tiktoken
from typing import List, Dict, Any

class ArticleProcessor:
    MAX_TOKENS = 15000  # Max number of token be able to send the api
    SUMMERY_AI_MODEL = "gpt-3.5-turbo-0125"
    PROMPT = '''Please summarize the following Hebrew articles As if you are the writer of the article,
    into a English summery of the articles,
    pay attention that you must end the summary accordingly to the max tokens given at end of sentence.
    focusing on the main points, arguments, and conclusions.
    Highlight any significant data, quotes, or statistics mentioned,
    and note the context in which they are presented. 
    If the article discusses multiple perspectives or debates,
    please outline these distinctly. Additionally,
    if there are any implications or recommendations made by the author,
    include these in the summary.
    Finally, if the article references specific events, individuals, or sources, 
    please identify these and their relevance to the article's overall message.
    pay attention to correct syntax and grammar in English.'''

    TEST_PROMPT = '''Translate the following English news article,
    into a hebrew article, pay attention to correct syntax and grammar in Hebrew.'''

    def __init__(self, api_key: str, similarity_threshold: float, encoding_name: str = "cl100k_base", linkage: str = 'average'):
        """
        Initializes the ArticleProcessor with API credentials and configuration for clustering and summarization.

        Args:
            api_key (str): The API key for accessing OpenAI's services.
            similarity_threshold (float): The threshold for determining cluster cutoff in similarity scoring.
            encoding_name (str): The name of the encoding model used for tokenizing text.
            linkage (str): The linkage criterion to use for clustering (e.g., 'average', 'complete').
        """
        self.__client = OpenAI(api_key=api_key)
        self.__similarity_threshold = similarity_threshold
        self.__encoding_name = encoding_name
        self.__linkage = linkage

    def __num_tokens_from_string(self, string: str) -> int:
        """
        Calculates the number of tokens in a text string using the specified encoding model.

        Args:
            string (str): The text to be tokenized.
            encoding_name (str): The encoding to use for tokenization.

        Returns:
            int: The number of tokens in the text.
        """
        encoding = tiktoken.get_encoding(self.__encoding_name)
        num_tokens = len(encoding.encode(string))
        return num_tokens

    def __make_clusters(self, similarity_matrix: List[List[float]], articles: List[Dict[str, Any]]) -> List[List[Dict[str, Any]]]:
        """
        Groups articles into clusters based on a similarity matrix and a pre-defined similarity threshold.

        Args:
            similarity_matrix (List[List[float]]): A matrix representing the pairwise similarities between articles.
            articles (List[Dict[str, Any]]): A list of articles, where each article is a dictionary.

        Returns:
            List[List[Dict[str, Any]]]: A list of clusters, each cluster being a list of article dictionaries.
        """

        clustering_model = AgglomerativeClustering(n_clusters=None, distance_threshold= self.__similarity_threshold, linkage=self.__linkage)
        clusters = clustering_model.fit_predict(similarity_matrix)
        clustered_articles = [[] for _ in range(len(set(clusters)))]
        
        for i in range(len(articles)):
            # Append each article to its corresponding cluster based on the cluster assignment.
            # The 'articles[i]' part assumes there's an 'articles' list available in the scope where each article's index corresponds to its position in the similarity matrix.
            clustered_articles[clusters[i]].append({'data': articles[i]['data'],'category': articles[i]['category'],'title': articles[i]['title']})

        return clustered_articles
    
    def __summarize_cluster(self, cluster: List[Dict[str, Any]]) -> Dict[str, Any]:
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

        # get the number of tokens in the cluster - and adjust if needed to maximum
        num_tokens = self.__num_tokens_from_string(cluster_string)
        if num_tokens > self.MAX_TOKENS:
            encoded_text = tiktoken.get_encoding(self.__encoding_name).encode(cluster_string)
            cluster_string = tiktoken.get_encoding(self.__encoding_name).decode(encoded_text[:self.MAX_TOKENS])

        # summarize the cluster into an english article.
        summary_in_english = self.__client.chat.completions.create(
            model = self.SUMMERY_AI_MODEL,
            messages=[
                {"role": "system", "content": self.PROMPT},
                {"role": "user", "content": f"Article: {cluster_string}"},
            ],
            max_tokens= max(int(num_tokens * 0.1), 250), # summery length at least 5 lines
        )

        # translate the summary to hebrew 
        summary = self.__client.chat.completions.create(
            model = self.SUMMERY_AI_MODEL,
            messages=[
                {"role": "system", "content": self.TEST_PROMPT},
                {"role": "user", "content": f"Article: {summary_in_english.choices[0].message.content}"},
            ],
        )

        # Include the category and title in the summary
        full_detailed_summary = {'title': cluster_title,'category': cluster_category, 'data': summary}
        
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
        self.write_clusters_to_file(clusters, "output clusters")
        summaries = [self.__summarize_cluster(cluster) for cluster in clusters]
        self.write_summaries_to_file(summaries, "output summeries")
        return summaries
    
    def __print_clusters(self, clusters: List[Dict[str, Any]]) -> None:
        for i, cluster in enumerate(clusters):
            print(f"-----Cluster {i}-----")
            for article in cluster:
                print(article['data'])
                print("")
            print("")





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

    def __print_summerize(self, summaries: List[Dict[str, Any]]) -> None:
        for i, summary in enumerate(summaries):
            print(f"-----Cluster {i}-----")
            for line in summary['data'].choices[0].message.content.split("."):
                print(line)
                print("")
            print("")

    def write_summaries_to_file(self, summaries: List[Dict[str, Any]], filename: str) -> None:
        text = self.__summaries_to_text(summaries)
        with open(filename, 'w', encoding="utf-8") as file:
            file.write(text)

    def __summaries_to_text(self, summaries: List[Dict[str, Any]]) -> str:
        text = ""
        for i, summary in enumerate(summaries):
            text += f"-----Cluster {i}-----\n"
            for line in summary['data'].choices[0].message.content.split("."):
                text += line + "\n\n"
            text += "\n"
        return text
