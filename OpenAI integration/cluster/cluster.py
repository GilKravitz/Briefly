class Cluster:
    def __init__(self, articles, cluster_id):
        '''
        Initializes a Cluster object with a list of articles.

        Args:
            articles (list): A list of article dictionaries.
            cluster_id (str): Identifier for the cluster.
        '''
        self._id = cluster_id
        self._articles = articles
        self._category = articles[0]['category_id'] if articles else None
        self._image = articles[0]['image_url'] if articles else None
        self._articles_ids = [article['id'] for article in articles]
        self._summary_text = ""
        self._summary_hashtags = ""
        self._summary_title = ""
        self._s3_image_url = ""

    @property
    def id(self):
        return self._id

    @property
    def articles(self):
        return self._articles

    @property
    def category(self):
        return self._category

    @property
    def image(self):
        return self._image

    @property
    def articles_ids(self):
        return self._articles_ids

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

    @property
    def s3_image_url(self):
        return self._s3_image_url

    @s3_image_url.setter
    def s3_image_url(self, value):
        self._s3_image_url = value

    @property
    def article_count(self):
        return len(self._articles)

    @property
    def combined_data(self):
        '''
        Combines the data from all articles in the cluster into a single string.

        Returns:
            str: A combined string of all article data in the cluster.
        '''
        return " ".join(f'Article number {i}:\n' + article['content'] for i, article in enumerate(self._articles))

    def cluster_to_text(self):
        '''
        Returns a textual representation of the cluster, listing each article's details.

        Returns:
            str: A formatted string detailing all articles in the cluster.
        '''
        return "\n\n".join(
            f"Article number {i}:\nID: {article['id']}\nPublish Date: {article['publish_date']}\nLink: {article['link']}\nCategory: {article['category_id']}\nTitle: {article['title']}\nContent: {article['content']}"
            for i, article in enumerate(self._articles)
        )
