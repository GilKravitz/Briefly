import os
import psycopg2
import psycopg2.extras
import logging
from datetime import datetime, timedelta
from dotenv import load_dotenv
from typing import List, Optional, Dict,Any

class DatabaseManager:
    def __init__(self):
        """
        Initializes the DatabaseManager instance by loading environment variables and establishing a database connection.
        """
        load_dotenv()
        self.__db_connection = self.__connect_to_database()
        self.logger = logging.getLogger(__name__)
        self.logger.info("DatabaseManager initialized")

    def __connect_to_database(self) -> Optional[psycopg2.extensions.connection]:
        """
        Establishes a connection to the PostgreSQL database using credentials obtained from environment variables.

        Returns:
            psycopg2.extensions.connection: A connection object if successful, None otherwise.
        """
        db_host = os.getenv("DB_HOST")
        db_port = os.getenv("DB_PORT")
        db_name = os.getenv("DB_NAME")
        db_user = os.getenv("DB_USER")
        db_password = os.getenv("DB_PASSWORD")

        db_connection = psycopg2.connect(
            host=db_host, port=db_port, database=db_name,
            user=db_user, password=db_password,
            cursor_factory=psycopg2.extras.DictCursor
        )
        return db_connection

    def fetch_articles(self, hours: int = 24) -> Optional[List[Dict]]:
        """
        Fetches articles from the database that were published within the last specified number of hours.

        Args:
            hours (int): The number of hours from the current time to filter articles by their publish date.

        Returns:
            List[Dict]: A list of dictionaries, each representing an article, if successful; None otherwise.
        """
        try:
            # Define the time range for the last X hours from the current time
            current_time = datetime.now()
            time_x_hours_ago = current_time - timedelta(hours=hours)
            cursor = self.__db_connection.cursor()

            self.logger.info(f"Fetching articles from the last {hours} hours.")

            # Execute a SELECT query to retrieve all scraped articles within the specified time range
            query = "SELECT * FROM scraped_articles WHERE publish_date >= %s"
            cursor.execute(query, (time_x_hours_ago,))
            articles = cursor.fetchall()

            return articles
        
        except psycopg2.Error as e:
            self.logger.error(f"Error executing query: {e}")
            return None
        finally:
            if cursor is not None:   # Close cursor
                cursor.close()

    def __insert_summarized_article(self, title: str, article: str, category: str,publish_date: str, links: str) -> None:
        """
        Inserts a summarized article into the 'merged_articles' table.

        Args:
            title (str): The title of the article.
            article (str): The content of the summarized article.
            category (str): The category of the article.
            publish_date (str): The category of the publish_date.
            links (str): The category of the links.

        Returns:
            None: Returns None but prints the result status to the console.
        """
        try:
            cursor = self.__db_connection.cursor()

            # SQL query to insert the summarized article into the merged_articles table
            insert_query = "INSERT INTO merged_articles (title, article, category,publish_date,links) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(insert_query, (title, article, category, publish_date, links))

            # Commit the changes to the database
            self.__db_connection.commit()
            self.logger.info(F"Article titled {title} inserted successfully into merged_articles table.")

        except Exception as e:
            self.logger.error(f"Error inserting article into database: {e}")
            self.__db_connection.rollback()
        finally:
            if cursor is not None:
                cursor.close()

    def insert_summarized_articles(self, summaries_article: List[Dict[str, Any]]) -> None:
        """
        Inserts multiple summarized articles into the database.

        Args:
            summaries_article (List[Dict[str, Any]]): A list of summaries to be inserted, each containing the necessary data.

        Returns:
            None
        """
        self.logger.info(f"Inserting {len(summaries_article)} summarized articles into the database.")
        if summaries_article:
            for summary in summaries_article:
                if summary:
                    self.__insert_summarized_article(summary['title'],summary['data'],summary['category'], summary['publish_date'], summary['links'])

    def close_connection(self) -> None:
        """
        Closes the database connection.

        Returns:
            None
        """
        if self.__db_connection:
            self.__db_connection.close()
            self.logger.info("Database connection closed")