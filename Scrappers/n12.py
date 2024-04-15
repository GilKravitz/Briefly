import requests
from bs4 import BeautifulSoup
from datetime import datetime
from BaseClasses import Article , BaseScrapper
from configuration.NewsConfig import N12_BASE_URL , N12_NEWS_TYPE
class N12_Scrapper(BaseScrapper):
    def __init__(self,base_url,site_name,news_type):
        BaseScrapper.__init__(self,base_url,site_name,news_type)

    def filter_links(self,href):
        return href and 'Article' in href
    
    def get_publish_date(self):
        try:
            display_date_span = self.article_soup.find('span', class_='display-date')
            date_span = display_date_span.find_all('span')[0]
            time_span = display_date_span.find_all('span')[1]
            date_text = date_span.get_text(strip=True)
            date_text = date_text.split(' ')[-1] # remove everything except the date.
            time_text = time_span.get_text(strip=True)
            day, month, year = date_text.split('/') #split the date into days and months and year
            formatted_date = f"{day}-{month}-{year} {time_text}"
            publish_date = datetime.strptime(formatted_date, '%d-%m-%y %H:%M')
            return publish_date
        except Exception as e:
            print("Error Ocuured on line 26 in file n12.py : " )
            print(e)
            return None
    
    def get_article(self, link,article_type):
        article_data = ""
        title = ""
        try:
            response = requests.get(link)
            response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
            self.article_soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
            print(link)
            publish_date = self.get_publish_date()
            all_content = self.article_soup.find_all(['p', 'h1', 'h2', 'strong'])

            # Collect all the data of the article
            for tag in all_content:
                if not tag.find_parent('section', class_='mako_comments') and 'content' not in tag.get('class', []):
                    if tag.name == 'h1':
                        title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                    article_data += tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                    article_data += " "
            
            article = Article(link,article_data, title,publish_date,article_type,self.site_name)
            return article
        except requests.RequestException as e:
            print(f"Error fetching article from {link}: {e}")
            return -1
        



if __name__ == '__main__':
    n12_scrapper = N12_Scrapper(N12_BASE_URL,"N12",N12_NEWS_TYPE)
    n12_scrapper.fetch_articles_and_commit()
