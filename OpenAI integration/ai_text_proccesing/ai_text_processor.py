import tiktoken
import logging
from cluster.cluster import Cluster
from db.database_manager import DatabaseManager
from openai import OpenAI
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class AiTextProcessor:
    OPEN_AI_EMMBEDDING_MODEL = 'text-embedding-3-large'
    SIMILARITY_THRESHOLD = 0.6

    def __init__(self, api_key: str):
        '''
        Initializes the AiTextProcessor with an API key and a specific embedding model name.

        Args:
            api_key (str): The API key for accessing OpenAI services.
            embedding_model_name (str): The name of the embedding model to use for generating embeddings.
        '''
        self.__client = OpenAI(api_key=api_key)
        self.logger = logging.getLogger(__name__)
        self.logger.info(f'AiTextProcessor initialized with OpenAI embedding model: {self.OPEN_AI_EMMBEDDING_MODEL}')

    def __num_tokens_from_string(self, string, encoding_name):
        '''
        Calculates the number of tokens in the given string using the specified encoding model.

        Args:
            string (str): The text string to tokenize.
            encoding_name (str): The name of the encoding model to use for tokenization.

        Returns:
            int: The number of tokens in the string.
        '''
        encoding = tiktoken.get_encoding(encoding_name)
        return len(encoding.encode(string))
    
    def __get_embeddings(self, text: str, max_tokens: int = 8100, encoding_name: str = "cl100k_base"):
        '''
        Generates embeddings for the given text using the specified OpenAI model.

        Args:
            text (str): The input text to generate embeddings for.
            model (str): The model ID to use for generating embeddings.
            max_tokens (int): The maximum number of tokens allowed.
            encoding_name (str): The encoding model name to be used for tokenization.

        Returns:
            list: The embedding vector as a list of floats.
        '''
        try:
            # Encode the text to check the token count in the API model bounds.
            num_tokens = self.__num_tokens_from_string(text, encoding_name)
            if num_tokens > max_tokens:
                encoded_text = tiktoken.get_encoding(encoding_name).encode(text)
                text = tiktoken.get_encoding(encoding_name).decode(encoded_text[:max_tokens])

            # Create embeddings using the OpenAI API
            res = self.__client.embeddings.create(
                model=self.OPEN_AI_EMMBEDDING_MODEL,
                input=text,
                encoding_format='float'
            )

            embedding_vector = res.data[0].embedding
            return embedding_vector
        except Exception as e:
            self.logger.error(f'Error in generating embeddings: {e}')
            return None
    
    def get_similarity_matrix(self, articles: List[Dict]) -> List[List[float]]:
        '''
        Computes the cosine similarity matrix for a list of articles based on their embeddings.

        Args:
            articles (List[Dict]): A list of dictionaries where each dictionary represents an article
                                   and must have a key 'content' with the article's text as the value.

        Returns:
            List[List[float]]: A 2D list (matrix) of cosine similarity scores between the articles.
        '''
        try:
            self.logger.info('Calculating similarity matrix for given articles.')
            if len(articles) < 2:
                return None
            embeddings = [self.__get_embeddings(article['content']) for article in articles]
            similarity_matrix = cosine_similarity(embeddings)
            return similarity_matrix
        except Exception as e:
            self.logger.error(f'Error in calculating similarity matrix: {e}')
            return None

    def make_clusters(self, similarity_matrix: List[List[float]], articles: List[Dict[str, Any]], db_manager: DatabaseManager) -> List[Cluster]:
        '''
        Groups articles into clusters based on a similarity matrix and a pre-defined similarity threshold.

        Args:
            similarity_matrix (List[List[float]]): A matrix representing the pairwise similarities between articles.
            articles (List[Dict[str, Any]]): A list of articles, each represented as a dictionary.

        Returns:
            List[Cluster]: A list of Cluster objects, each containing a group of articles.
        '''
        if len(articles) > 1:  
            self.logger.info('Clustering articles based on similarity matrix.')
        else:
            self.logger.info('not enough articles to clustering (<1)')
            return None

        # Initialize the clustering model with a dynamic number of clusters based on a distance threshold
        clustering_model = AgglomerativeClustering(n_clusters=None, distance_threshold=AiTextProcessor.SIMILARITY_THRESHOLD, linkage='average')
        cluster_labels = clustering_model.fit_predict(similarity_matrix)
        clusters_dict = {label: [] for label in set(cluster_labels)}

        # Assign articles to their respective clusters
        for article_index, cluster_label in enumerate(cluster_labels):
            clusters_dict[cluster_label].append(articles[article_index])

        # Convert lists of articles into Cluster objects and assign cluster IDs
        clusters = []
        for group_articles in clusters_dict.values():
            cluster_id = db_manager.create_cluster()
            cluster = Cluster(articles=group_articles, cluster_id=cluster_id)
            clusters.append(cluster)
            db_manager.add_articles_to_cluster(cluster_id, cluster.articles_ids)
        
        # TODO: Debugging clusters to text file, remove in production
        self.__write_clusters_to_file(clusters, 'clusters.txt')

        return clusters
    
    def __write_clusters_to_file(self, clusters: List[Cluster], filename: str) -> None:
        '''Writes the textual representation of each cluster to a file.

        Args:
            clusters (List[Cluster]): A list of Cluster objects to be written to the file.
            filename (str): The name of the file where the cluster data will be stored.
        '''
        text = ''
        for i, cluster in enumerate(clusters):
            text += f'-----Cluster {i}-----\n'
            text += cluster.cluster_to_text()
            text += '\n'

        with open(filename, 'w', encoding='utf-8') as file:
            file.write(text)