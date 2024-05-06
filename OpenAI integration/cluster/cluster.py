class Cluster:
    def __init__(self, articles):
        '''Initializes a Cluster object with a list of articles.

        Args:
            articles (list): A list of article dictionaries.
        '''
        self.articles = articles
        self.category = articles[0]['category'] if articles else None
        self.title = articles[0]['title'] if articles else None
        self.image = articles[0]['image'] if articles else None
        self.publish_date = articles[0]['publish_date'] if articles else None
        self.links = " ".join(article['link'] for article in articles)
        self.articles_ids = [article['id'] for article in articles]
        self._summary_text = ""
        self._summary_hashtags = ""
        self._summary_title = ""

    @property
    def combined_data(self):
        '''Combines the data from all articles in the cluster into a single string.

        Returns:
            str: A combined string of all article data in the cluster.
        '''
        return " ".join(f'article number {i}:\n' + article['data'] for i, article in enumerate(self.articles))

    @property
    def article_count(self):
        return len(self.articles)
    
    @property
    def summary_text(self):
        return self._summary_text
    
    @summary_text.setter
    def summary_text(self, value):
        self._summary_text = value

    @property
    def summary_title(self):
        return self._summary_title
    
    @summary_title.setter
    def summary_title(self, value):
        self._summary_title = value

    @property
    def summary_hashtags(self):
        return self._summary_hashtags
    
    @summary_hashtags.setter
    def summary_hashtags(self, value):
        self._summary_hashtags = value
    
    def cluster_to_text(self):
        '''Returns a textual representation of the cluster, listing each article's details.

        Returns:
            str: A formatted string detailing all articles in the cluster.
        '''
        text = ""
        for i, article in enumerate(self.articles):
            text += f"Article number {i}:\n"
            text += f"ID: {article['id']}\n"
            text += f"Publish Date: {article['publish_date']}\n"
            text += f"Link: {article['link']}\n"
            text += f"Category: {article['category']}\n"
            text += f"Title: {article['title']}\n"
            text += f"Data: {article['data']}\n\n"
        return text
