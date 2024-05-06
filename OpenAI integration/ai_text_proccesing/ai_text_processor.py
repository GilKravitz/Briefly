import tiktoken
import logging
from cluster.cluster import Cluster
from openai import OpenAI
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class AiTextProcessor:
    SIMILARITY_THRESHOLD = 0.6

    def __init__(self, api_key: str, embedding_model_name: str):
        '''Initializes the AiTextProcessor with an API key and a specific embedding model name.

        Args:
            api_key (str): The API key for accessing OpenAI services.
            embedding_model_name (str): The name of the embedding model to use for generating embeddings.
        '''
        self.__client = OpenAI(api_key=api_key)
        self.__embedding_model_name = embedding_model_name
        self.logger = logging.getLogger(__name__)
        self.logger.info(f'AiTextProcessor initialized with OpenAI embedding model: {embedding_model_name}')

    def __num_tokens_from_string(self, string, encoding_name):
        '''Calculates the number of tokens in the given string using the specified encoding model.

        Args:
            string (str): The text string to tokenize.
            encoding_name (str): The name of the encoding model to use for tokenization.

        Returns:
            int: The number of tokens in the string.
        '''
        encoding = tiktoken.get_encoding(encoding_name)
        return len(encoding.encode(string))
    
    def __get_embeddings(self, text: str, model: str, max_tokens: int = 8100, encoding_name: str = "cl100k_base"):
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
                model=model,
                input=text,
                encoding_format='float'
            )

            embedding_vector = res.data[0].embedding
            return embedding_vector
        except Exception as e:
            self.logger.error(f'Error in generating embeddings: {e}')
            return None
    
    def get_similarity_matrix(self, articles: List[Dict]) -> List[List[float]]:
        '''Computes the cosine similarity matrix for a list of articles based on their embeddings.

        Args:
            articles (List[Dict]): A list of dictionaries where each dictionary represents an article
                                   and must have a key 'data' with the article's text as the value.

        Returns:
            List[List[float]]: A 2D list (matrix) of cosine similarity scores between the articles.
        '''
        try:
            self.logger.info('Calculating similarity matrix for given articles.')
            if len(articles) < 2:
                return None
            embeddings = [self.__get_embeddings(article['data'], self.__embedding_model_name) for article in articles]
            similarity_matrix = cosine_similarity(embeddings)
            return similarity_matrix
        except Exception as e:
            self.logger.error(f'Error in calculating similarity matrix: {e}')
            return None


    @staticmethod
    def make_clusters(similarity_matrix: List[List[float]], articles: List[Dict[str, Any]]) -> List[Cluster]:
        '''Groups articles into clusters based on a similarity matrix and a pre-defined similarity threshold.

        Args:
            similarity_matrix (List[List[float]]): A matrix representing the pairwise similarities between articles.
            articles (List[Dict[str, Any]]): A list of articles, each represented as a dictionary.

        Returns:
            List[Cluster]: A list of Cluster objects, each containing a group of articles.
        '''

        # Initialize the clustering model with a dynamic number of clusters based on a distance threshold
        clustering_model = AgglomerativeClustering(n_clusters=None, distance_threshold=AiTextProcessor.SIMILARITY_THRESHOLD, linkage='average')
        cluster_labels = clustering_model.fit_predict(similarity_matrix)
        clusters_dict = {label: [] for label in set(cluster_labels)}

        # Assign articles to their respective clusters
        for article_index, cluster_label in enumerate(cluster_labels):
            clusters_dict[cluster_label].append(articles[article_index])

        # Convert lists of articles into Cluster objects
        return [Cluster(articles=group) for group in clusters_dict.values()]