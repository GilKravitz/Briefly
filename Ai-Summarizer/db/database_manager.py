import os
import logging
import copy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from cluster.cluster import Cluster
from aws_image_manager.aws_image_manager import AWSImageManager
from .database_models import TableModels
from dotenv import load_dotenv
from typing import List, Optional, Dict

class DatabaseManager:
    def __init__(self):
        '''
        Initializes the DatabaseManager instance by loading environment variables and establishing a database connection.
        '''
        load_dotenv()
        self.logger = logging.getLogger(__name__)
        self.__db_connection = self.__connect_to_database()
        self.logger.info('DatabaseManager initialized')
        self.aws_image_uploader_manager = AWSImageManager()

    def __connect_to_database(self):
        '''
        Sets up the SQLAlchemy database connection using credentials from environment variables.

        Returns:
            sessionmaker: SQLAlchemy sessionmaker object for database operations.
        '''
        db_host = os.getenv('AWS_DB_HOST')
        db_port = os.getenv('AWS_DB_PORT')
        db_name = os.getenv('AWS_DB_NAME')
        db_user = os.getenv('AWS_DB_USERNAME')
        db_password = os.getenv('AWS_DB_PASSWORD')

        # SQLAlchemy setup
        database_url = f'postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
        engine = create_engine(database_url)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        
        self.logger.info('Database connection established')
        return SessionLocal()

    def fetch_articles(self) -> Optional[List[Dict]]:
        '''
        Fetches unprocessed articles from the database and marks them as processed.

        Returns:
            List[Dict]: A list of dictionaries, each representing an article, if successful; None otherwise.
        '''
        try:
            self.logger.info('Fetching unprocessed articles.')
            articles = self.__db_connection.query(TableModels.ScrapedArticleTable).filter(
                TableModels.ScrapedArticleTable.is_processed == False).all()
            
            article_ids = [article.id for article in articles]
            articles_dicts = [copy.deepcopy(article.__dict__)  for article in articles]
            
            # Mark articles as processed
            self.__db_connection.query(TableModels.ScrapedArticleTable).filter(
                TableModels.ScrapedArticleTable.id.in_(article_ids)).update({TableModels.ScrapedArticleTable.is_processed: True})
            self.__db_connection.commit()

            self.logger.info(f'Fetched and Marked articles as processed: {article_ids}')
            
            return articles_dicts
        except Exception as e:
            self.logger.error(f'Error fetching and updating articles: {e}')
            self.__db_connection.rollback()
            return None

    def __insert_summarized_article(self, cluster: Cluster) -> None:
        '''
        Inserts a summarized article into the 'merged_articles' table.

        Args:
            cluster (Cluster): The cluster object containing the summarized article data to be inserted.

        Returns:
            None
        '''
        # if cluster summary is empty (ai safety_settings constrains) - do not insert to DB 
        if cluster._summary_text == '':  
            return
        try:
            #Insert the summarized article into GeneratedArticleTable
            generated_article = TableModels.GeneratedArticleTable(
                title=cluster.summary_title,
                content=cluster.summary_text,
                image_url=cluster.s3_image_url,
                cluster_id=cluster.id
            )
            self.__db_connection.add(generated_article)
            self.__db_connection.commit()
            self.logger.info(f'cluster number {cluster.id} inserted successfully into generated_articles table.')
        except Exception as e:
            # Log the error and rollback the transaction
            self.logger.error(f'Error inserting article into database: {e}, performing a rollback.')
            self.__db_connection.rollback()

    def create_cluster(self) -> int:
        '''
        Creates a new cluster in the ClusterTable and returns the ID of the newly created cluster.
        Returns:
            int: The ID of the newly created cluster.
        '''
        # Step 1: Insert the cluster into the ClusterTable
        new_cluster = TableModels.ClusterTable()
        self.__db_connection.add(new_cluster)
        self.__db_connection.commit()
        self.logger.info(f'Cluster ID {new_cluster.id} inserted successfully into clusters table.')
        return new_cluster.id

    def add_articles_to_cluster(self, cluster_id: int, article_ids: List[int]) -> None:
        '''
        Adds articles to the ArticlesClusterTable with the given cluster ID.

        Args:
            cluster_id (int): The ID of the cluster.
            article_ids (List[int]): A list of article IDs to be added to the cluster.
        '''
        try:
            for article_id in article_ids:
                article_cluster = TableModels.ArticlesClusterTable(
                    scraped_article_id=article_id,
                    cluster_id=cluster_id
                )
                self.__db_connection.add(article_cluster)
            self.__db_connection.commit()
            self.logger.info(f'Article id/s: {article_ids} inserted into cluster ID {cluster_id} successfully.')
        except Exception as e:
            self.logger.error(f'Error adding articles to cluster ID {cluster_id}: {e}, performing a rollback.')
            self.__db_connection.rollback()

    def insert_summarized_articles(self, clusters: List[Cluster]) -> None:
        '''
        Inserts multiple summarized articles cluster into the database.

        Args:
            clusters (List[Cluster]): A list of Cluster objects, each containing the summarized article data.
        '''
        if clusters is None or len(clusters) == 0:
            self.logger.info('No summarized articles to insert into the database.')
            return
        
        self.aws_image_uploader_manager.insert_images_to_aws(clusters)
        self.logger.info(f'Inserting {len(clusters)} summarized articles into the database.')
        for cluster in clusters:
            self.__insert_summarized_article(cluster)
       
    def close_connection(self) -> None:
        '''
        Closes the database connection.
        '''
        if self.__db_connection:
            self.__db_connection.close()
            self.logger.info('Database connection closed')
