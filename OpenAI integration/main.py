import os
from db.database_manager import DatabaseManager
from ai_text_proccesing.ai_text_processor import AiTextProcessor
from article_prossecor.article_processor import ArticleProcessor

class Application:
    SIMILARITY_THRESHOLD = 0.6
    HOURS_FROM_LAST_FETCH = 163
    OPEN_AI_EMMBEDDING_MODEL = 'text-embedding-3-large'

    def __init__(self, api_key: str):
        """
        Initializes the Application with necessary components.

        Args:
            api_key (str): API key for accessing OpenAI services.
        """
        self.db_manager = DatabaseManager()
        self.ai_text_processor = AiTextProcessor(api_key, self.OPEN_AI_EMMBEDDING_MODEL)
        self.processor = ArticleProcessor(api_key, self.SIMILARITY_THRESHOLD)

    def run(self) -> None:
        """
        Main execution function for the application. Fetches articles, processes them and stores summaries.
        """
        articles = self.db_manager.fetch_articles(self.HOURS_FROM_LAST_FETCH)
        similarity_matrix = self.ai_text_processor.get_similarity_matrix(articles)
        article_summaries = self.processor.process_articles(articles, similarity_matrix)
        self.db_manager.insert_summarized_articles(article_summaries)
        self.db_manager.close_connection()

if __name__ == "__main__":
    api_key = os.getenv("OPEN_AI_API_KEY")
    app = Application(api_key)
    app.run()
