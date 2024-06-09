import logging
import backoff
from ratelimit import limits, RateLimitException
from typing import List
import google.generativeai as genai
from cluster.cluster import Cluster

class ArticleProcessor:
    MAX_TOKENS_PER_CLUSTER = 20000          # Max number of tokens that can be sent to the API
    MAX_NUMBER_OF_WORDS = 7000
    MAX_REQUESTS_PER_MINUTE = 10
    MAX_SUMMARY_ATTEMPTS = 3
    SUMMERY_AI_MODEL = 'gemini-1.0-pro-001'
    PROMPT = '''summarize the following articles into a single article summary.
    write the summary in Hebrew as you are the journalist with 300 words maximum, do not refer to the article in the third person.
    The summary structure follows standard article formatting with paragraphs. 
    Summarize the article by highlighting its main points, arguments, and conclusions.
    Include significant data, quotes, or statistics, noting their context.
    If the article covers multiple perspectives or debates, outline them distinctly.
    Also, mention any implications or recommendations made by the author.
    Identify specific events, individuals, or sources referenced in the article and explain their relevance to the overall message.'''

    def __init__(self, api_key: str):
        '''Initializes the ArticleProcessor with API credentials and configuration for clustering and summarization.

        Args:
            api_key (str): The API key for accessing OpenAI's services.
        '''
        genai.configure(api_key=api_key)

        # Set up the model
        generation_config = {
            'temperature': 0.75,
            'top_p': 1,
            'top_k': 1,
            'max_output_tokens': 2048,
        }

        safety_settings = [
            {'category': 'HARM_CATEGORY_HARASSMENT', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_HATE_SPEECH', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold': 'BLOCK_NONE'},
            {'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold': 'BLOCK_NONE'},
        ]

        self.logger = logging.getLogger(__name__)
        self.logger.info(f'ArticleProcessor initialized with AI summary model: ' + self.SUMMERY_AI_MODEL)

        # Set the model to be used
        self.model = genai.GenerativeModel(model_name=self.SUMMERY_AI_MODEL,
                                           generation_config=generation_config,
                                           safety_settings=safety_settings)
        self.convorsation = self.model.start_chat()
    
    @backoff.on_exception(backoff.expo,RateLimitException,max_tries=10,max_time=300)
    @limits(calls=MAX_REQUESTS_PER_MINUTE, period=60)
    def __summarize_cluster_gimini(self, cluster: Cluster):
        '''Summarizes a cluster of articles using the OpenAI API.

        Args:
            cluster (Cluster): A cluster of articles to be summarized.
        '''
        cluster_string = cluster.combined_data
        cluster_string = self.__prepare_cluster_string(cluster_string)
        self.__send_and_summarize(cluster, cluster_string)

    def process_clusters(self, clusters: List[Cluster]) -> List[Cluster]:
        '''Processes a list of clusters by summarizing them.

        Args:
            clusters (List[Cluster]): The clusters to process.

        Returns:
            List[Cluster]: A list of clusters with summarized articles.
        '''
        if not clusters:
            self.logger.error('No clusters to process.')
            return None

        self.logger.info('Summarizing clusters.')
        for i,cluster in enumerate(clusters):
            self.logger.info(f"Summerzing {i+1}/{len(clusters)} clusters.")
            self.__summarize_cluster_gimini(cluster)

        # TODO: Debug the summary text file, remove in production
        self.__write_summaries_to_file(clusters, 'summaries.txt')

        return clusters
    
    def __prepare_cluster_string(self, cluster_string: str) -> str:
        '''Prepares the cluster string for summarization by ensuring it does not exceed 
        the maximum allowed tokens. It truncates the string if necessary.
        
        Args:
            cluster_string (str): The combined text of the cluster.
            
        Returns:
            str: The adjusted cluster string that fits within token limits.
        '''
        tokens_in_message = self.model.count_tokens(self.PROMPT + cluster_string).total_tokens
        if tokens_in_message > self.MAX_TOKENS_PER_CLUSTER:
            words = cluster_string.split()[:self.MAX_NUMBER_OF_WORDS]
            cluster_string = ' '.join(words)
        return cluster_string

    def __send_and_summarize(self, cluster: Cluster, cluster_string: str):
        '''Sends the prepared cluster string to the API for summarization and logs the process.
        It updates the cluster object with the summary obtained.

        Args:
            cluster (Cluster): The cluster being summarized.
            cluster_string (str): The prepared string of the cluster.
        '''
        for attempt in range(1, self.MAX_SUMMARY_ATTEMPTS + 1):
            try:
                self.convorsation = self.model.start_chat()
                
                # Send prompt and cluster string for summarization
                self.convorsation.send_message(self.PROMPT + cluster_string)
                self.logger.debug(f'Summarizing cluster ID {cluster.id} with article IDs: {", ".join(map(str, cluster.articles_ids))}')
                cluster.summary_text = self.convorsation.last.text
                
                self.convorsation.send_message('write me a title in hebrew to this summary')
                cluster.summary_title = self.convorsation.last.text
                
                self.convorsation.send_message('give me 3 hashtags in hebrew for this summary')
                cluster.summary_hashtags = self.convorsation.last.text
                break # Exit the retry loop on successful summarization
            
            except Exception as e:
                self.logger.error(f'Attempt {attempt} to summeries cluster {cluster.id} failed with error: {e}')
                if attempt == self.MAX_SUMMARY_ATTEMPTS:
                    self.logger.critical(f'All {self.MAX_SUMMARY_ATTEMPTS} attempts to summeries cluster {cluster.id} failed.')

    def __write_summaries_to_file(self, clusters: List[Cluster], filename: str):
        '''Writes the summaries to a file.

        Args:
            clusters (List[Cluster]): A list of clusters whose summaries are to be written to the file.
            filename (str): The name of the file where the summaries will be stored.
        '''
        with open(filename, 'w', encoding='utf-8') as file:
            for cluster_index, cluster in enumerate(clusters):
                file.write(f'-----Summary of Cluster {cluster_index}-----\n')
                file.write(cluster.summary_text)
                file.write('\n\n')