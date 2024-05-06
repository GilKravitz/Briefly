import os
import psycopg2
import psycopg2.extras
import logging
from cluster.cluster import Cluster
from datetime import datetime, timedelta
from dotenv import load_dotenv
from typing import List, Optional, Dict, Any

class DatabaseManager:
    def __init__(self):
        '''Initializes the DatabaseManager instance by loading environment variables and establishing a database connection.'''
        load_dotenv()
        self.__db_connection = self.__connect_to_database()
        self.logger = logging.getLogger(__name__)
        self.logger.info('DatabaseManager initialized')

    def __connect_to_database(self) -> Optional[psycopg2.extensions.connection]:
        '''Establishes a connection to the PostgreSQL database using credentials obtained from environment variables.

        Returns:
            psycopg2.extensions.connection: A connection object if successful, None otherwise.
        '''
        db_host = os.getenv('DB_HOST')
        db_port = os.getenv('DB_PORT')
        db_name = os.getenv('DB_NAME')
        db_user = os.getenv('DB_USER')
        db_password = os.getenv('DB_PASSWORD')

        db_connection = psycopg2.connect(
            host=db_host, port=db_port, database=db_name,
            user=db_user, password=db_password,
            cursor_factory=psycopg2.extras.DictCursor
        )
        return db_connection

    def fetch_articles(self, hours: int = 24) -> Optional[List[Dict]]:
        '''Fetches articles from the database that were published within the last specified number of hours.

        Args:
            hours (int): The number of hours from the current time to filter articles by their publish date.

        Returns:
            List[Dict]: A list of dictionaries, each representing an article, if successful; None otherwise.
        '''
        try:
            current_time = datetime.now()
            time_x_hours_ago = current_time - timedelta(hours=hours)
            cursor = self.__db_connection.cursor()

            self.logger.info(f'Fetching articles from the last {hours} hours.')

            query = 'SELECT * FROM scraped_articles WHERE publish_date >= %s'
            cursor.execute(query, (time_x_hours_ago,))
            articles = cursor.fetchall()

            return articles
        
        except psycopg2.Error as e:
            self.logger.error(f'Error executing query: {e}')
            return None
        finally:
            if cursor is not None:
                cursor.close()

    def __insert_summarized_article(self, cluster: Cluster) -> None:
        '''Inserts a summarized article into the 'merged_articles' table.

        Args:
            cluster (Cluster): The cluster object containing the summarized article data to be inserted.

        Returns:
            None
        '''
        try:
            cursor = self.__db_connection.cursor()
            insert_query = 'INSERT INTO merged_articles (title, article, category, publish_date, links, image) VALUES (%s, %s, %s, %s, %s, %s)'
            cursor.execute(insert_query, (cluster.title, cluster.summary_text, cluster.category, cluster.publish_date, cluster.links, cluster.image))

            self.__db_connection.commit()
            self.logger.info(f'Article titled {cluster.title} inserted successfully into merged_articles table.')

        except Exception as e:
            self.logger.error(f'Error inserting article into database: {e}')
            self.__db_connection.rollback()
        finally:
            if cursor is not None:
                cursor.close()

    def insert_summarized_articles(self, clusters: List[Cluster]) -> None:
        '''Inserts multiple summarized articles cluster into the database.

        Args:
            clusters (List[Cluster]): A list of Cluster objects, each containing the summarized article data.

        Returns:
            None
        '''
        self.logger.info(f'Inserting {len(clusters)} summarized articles into the database.')
        for cluster in clusters:
            self.__insert_summarized_article(cluster)

    def close_connection(self) -> None:
        '''Closes the database connection.

        Returns:
            None
        '''
        if self.__db_connection:
            self.__db_connection.close()
            self.logger.info('Database connection closed')
