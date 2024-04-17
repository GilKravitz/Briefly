from abc import ABC , abstractmethod
import requests
from bs4 import BeautifulSoup
from configuration.NewsConfig import NUMBER_OF_ARTICLES
from db.db import check_duplicate_article ,commit_article
class Article():
    def __init__(self, link, data, title, publish_date, category,source):
        self.link = link
        self.data = data
        self.title = title
        self.publish_date = publish_date
        self.category = category
        self.source = source

class BaseScrapper(ABC):
    def __init__(self,base_url,site_name,news_type , relevant_links , unrelevant_links=None):
        self.base_url = base_url
        self.site_name = site_name
        self.news_type = news_type
        self.relevant_links = relevant_links
        self.unrelevant_links = unrelevant_links
    def filter_unrelevant_links(self , link):
        if self.unrelevant_links:
            for unrelevant_link in self.unrelevant_links:
                if unrelevant_link in link:
                    return True
        for relevant_link in self.relevant_links:
            if relevant_link in link:
                return False
        return True

    @abstractmethod
    def filter_links(self,href):
        pass

    def get_links(self , article_type):
        try:
            response = requests.get(self.base_url + "/" + article_type)
            if response.status_code == 200:
                self.article_type_homepage_soup = BeautifulSoup(response.text, 'html.parser')
                article_links = set() # defined as set to prevent duplicate article links.
                for a_tag in self.article_type_homepage_soup.find_all('a', href=self.filter_links):
                    if len(article_links) < NUMBER_OF_ARTICLES:
                        link = a_tag.get('href')
                        if self.filter_unrelevant_links(link):
                            continue
                        if link.startswith(self.base_url):
                            full_link = link
                        else:
                            full_link = self.base_url + str(link)
                        duplicate_article = check_duplicate_article(full_link)
                        if duplicate_article:
                            article_links = list(article_links)[:NUMBER_OF_ARTICLES]
                            return article_links #after duplicate article all links will be duplicates as well
                        article_links.add(full_link)
                    else:
                        break
                article_links = list(article_links)[:NUMBER_OF_ARTICLES]
                return article_links
        except Exception as e:
            print("Error Ocuured on line 60 in file BaseClasses.py : " )
            print(e)
        
    @abstractmethod
    def get_article(self,link,article_type):
        pass

    def fetch_articles_and_commit(self):
        for article_type in self.news_type:
            article_links = self.get_links(article_type)
            for link in article_links:
                article = self.get_article(link , article_type)
                if article == -1:
                    print(f"Error fetching article from {link}")
                else:
                    if commit_article(article):
                        pass
                    else:
                        print(f"Error commiting article to database")






