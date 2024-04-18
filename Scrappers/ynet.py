import requests
from bs4 import BeautifulSoup
from BaseClasses import Article , BaseScrapper
from datetime import datetime


class Ynet_Scrapper(BaseScrapper):
    def __init__(self,base_url,site_name,news_type , relevant_links):
        BaseScrapper.__init__(self,base_url,site_name,news_type , relevant_links)

    def filter_fetched_links(self , href):
        return href and 'article' in href
    
    def get_publish_date(self):
        try:
            display_date = self.article_soup.find('time', class_='DateDisplay')
            # Extract the value of the datetime attribute
            datetime_value = display_date.get('datetime')
            # Remove the seconds and 'Z' from the datetime string
            datetime_value = datetime_value[:-6]
            # Convert to datetime object
            formatted_date = datetime.strptime(datetime_value, '%Y-%m-%dT%H:%M:%S')
            return formatted_date

        except Exception as e:
            print("Error Ocuured on line 27 in file ynet.py : ")
            print(e)
            return None
    
    def get_article_content(self , link ,article_type):
        article_data = ""
        title = ""
        try:
            response = requests.get(link)
            response.raise_for_status()
            self.article_soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
            article_publish_date = self.get_publish_date()
            all_content = self.article_soup.find_all(['span', 'h1', 'h2','strong'])
            for tag in all_content:
                if tag.name == 'span' and tag.get('data-text') != 'true':
                    continue
                if tag.name == 'h1':
                    title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data+=tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data+=" "
            article = Article(link,article_data,title,article_publish_date,article_type,self.site_name)
            return article
        except requests.RequestException as e:
            print(f"Error fetching article from {link}: {e}")
            return -1






