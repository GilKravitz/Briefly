from abc import ABC , abstractmethod

class Article(ABC):
    def __init__(self, link, data, title, publish_date, category):
        self.link = link
        self.data = data
        self.title = title
        self.publish_date = publish_date
        self.category = category
    @abstractmethod    
    def abstract(self):
        pass

class N12_Article(Article):
    def __init__(self, link, data, title , published_date, category):
        newsType = ["news-military" , "news-sport"] # change this to add more news types..
        super().__init__(link, data , title, published_date, category)
        self.source = "N12"
    def abstract(self):
        pass

class N13_Article(Article):
    def __init__(self, link, data, title , published_date, category):
        super().__init__(link, data , title, published_date, category)
        self.source = "N13"
    def abstract(self):
        pass


class Ynet_Article(Article):
    def __init__(self, link, data, title , published_date, category):
        super().__init__(link, data , title, published_date, category)
        self.source = "Ynet"
    def abstract(self):
        pass




