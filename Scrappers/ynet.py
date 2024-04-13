import requests
from bs4 import BeautifulSoup
from datetime import datetime
from BaseClasses import Article , BaseScrapper

class Ynet_Scrapper(BaseScrapper):
    def __init__(self,base_url,site_name,news_type):
        BaseScrapper.__init__(self,base_url,site_name,news_type)

    def filter_links(href):
        return href and 'article' in href
    
    def get_publish_date(self):
        try:
            return publish_date
        except Exception as e:
            print(e)
            return None
    
def get_article(self , link ,article_type):
    article_data = ""
    title = ""
    try:
        response = requests.get(link)
        response.raise_for_status()
        self.article_soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
        publish_date = self.get_publish_date(self.article_soup)
        all_content = self.article_soup.find_all(['span', 'h1', 'h2','strong'])
        for tag in all_content:
            if tag.name == 'span' and tag.get('data-text') != 'true':
                continue
            if tag.name == 'h1':
                title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
            article_data+=tag.get_text(strip=True).encode('utf-8').decode('utf-8')
            article_data+=" "
        article = Article(link,article_data,title,publish_date,article_type)
        return article
    except requests.RequestException as e:
        print(f"Error fetching article from {link}: {e}")
        return -1







