import os
import logging
import sys
import boto3
from db.database_manager import DatabaseManager
from ai_text_proccesing.ai_text_processor import AiTextProcessor
from article_processor.article_processor import ArticleProcessor
class AI_Integration:
    def __init__(self, openai_api_key: str, gimini_api_key: str):
        '''
        Initializes the Application with necessary components.

        Args:
            openai_api_key (str): API key for accessing OpenAI services.
            gimini_api_key (str): API key for accessing Gimini services.
        '''
        logging.basicConfig(level=logging.DEBUG,
                            format='%(asctime)s - %(levelname)s - %(message)s',
                            filename='application.log',filemode='w',encoding='utf-8')
        logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))

        self.db_manager = DatabaseManager()
        self.ai_text_processor = AiTextProcessor(openai_api_key)
        self.processor = ArticleProcessor(gimini_api_key)
        logging.info('Application initialized with API keys.')

    def run(self) -> None:
        '''
        Main execution function for the application. Fetches articles, processes them and stores summaries.
        '''
        articles = self.db_manager.fetch_articles()
        similarity_matrix = self.ai_text_processor.get_similarity_matrix(articles)
        clusters = self.ai_text_processor.make_clusters(similarity_matrix, articles,self.db_manager)
        article_summaries = self.processor.process_clusters(clusters)
        self.db_manager.insert_summarized_articles(article_summaries)
        self.db_manager.close_connection()

def notify_embedding_text_summarizer_done():
    '''
    Publish a notification to AWS SNS to indicate that the Scraper Service has completed its task.
    
    This function creates a boto3 client for SNS in the specified region and publishes a message
    to the 'text_summarize_done_topic' topic to notify the Text Summarizer Service that it has completed.
    '''
    region = 'il-central-1'

    # AWS account ID where the SNS topic resides
    account_id = os.getenv('AWS_ACCOUNT_ID')
    sns = boto3.client('sns', region_name=region)
    topic_arn = f'arn:aws:sns:{region}:{account_id}:text_summarize_done_topic'
    
    # Publish a message to the SNS topic
    sns.publish(
        TopicArn=topic_arn,
        Message='AI integration Service Completed'
    )

if __name__ == '__main__':
    logging.info('Starting AI Integration Service...')
    openai_api_key = os.getenv('OPEN_AI_API_KEY')
    gimini_api_key = os.getenv('GIMINI_API_KEY')
    ai_integrator = AI_Integration(openai_api_key, gimini_api_key)
    ai_integrator.run()
    logging.info('AI Integration Service Completed.')
    notify_embedding_text_summarizer_done()