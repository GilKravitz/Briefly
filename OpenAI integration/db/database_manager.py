import os
import psycopg2
import psycopg2.extras
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

    def __connect_to_database(self) -> Optional[psycopg2.extensions.connection]:
        """
        Establishes a connection to the PostgreSQL database using credentials obtained from environment variables.

        Returns:
            psycopg2.extensions.connection: A connection object if successful, None otherwise.
        """
        try:
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
        except Exception as e:
            print(f"Error connecting to database: {e}")
            return None

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

            # Execute a SELECT query to retrieve all scraped articles within the specified time range
            query = "SELECT * FROM scraped_articles WHERE publish_date >= %s"
            cursor.execute(query, (time_x_hours_ago,))
            articles = cursor.fetchall()

            return articles
        
        except psycopg2.Error as e:
            print(f"Error executing query: {e}")
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
            # Create a cursor object
            cursor = self.__db_connection.cursor()

            # SQL query to insert the summarized article into the merged_articles table
            insert_query = "INSERT INTO merged_articles (title, article, category,publish_date,links) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(insert_query, (title, article, category, publish_date, links))

            # Commit the changes to the database
            self.__db_connection.commit()
            print("Article inserted successfully into merged_articles table.")

        except Exception as e:
            # Rollback in case of any error
            print(f"Error inserting article into database: {e}")
            self.__db_connection.rollback()
        finally:
            # Close the cursor
            if cursor is not None:
                cursor.close()

    def insert_summarized_articles(self, article_summaries: List[Dict[str, Any]]) -> None:
        """
        Inserts multiple summarized articles into the database.

        Args:
            article_summaries (List[Dict[str, Any]]): A list of summaries to be inserted, each containing the necessary data.

        Returns:
            None
        """
        if article_summaries:
            for summary in article_summaries:
                self.__insert_summarized_article(summary['title'],summary['data'],summary['category'], summary['publish_date'], summary['links'])

    def close_connection(self) -> None:
        """
        Closes the database connection.

        Returns:
            None
        """
        if self.__db_connection:
            self.__db_connection.close()