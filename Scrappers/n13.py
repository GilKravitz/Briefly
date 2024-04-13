import requests
from bs4 import BeautifulSoup
from datetime import datetime , timedelta
from BaseClasses import Article , BaseScrapper
from configuration.NewsConfig import N13_BASE_URL , N13_NEWS_TYPE

class N13_Scrapper(BaseScrapper):
    def __init__(self,base_url,site_name,news_type):
        BaseScrapper.__init__(self,base_url,site_name,news_type)

    def filter_links(self,href):
        return href and 'item/news' in href
    
    def get_publish_date(self):
        try:
            display_date_span = self.article_soup.select_one('span[class^="ArticleCreditsstyles__DateContainer"]')
            date_time_str = display_date_span.text.strip()
            if '.' in date_time_str:
                # Case: "dd:mm hh:mm"
                date = date_time_str.split(',')[0]
                time = date_time_str.split(',')[1]
                year = datetime.now().strftime('%y')
                month = date.split('.')[1]
                day = date.split('.')[0]
                formatted_date = f"{day}-{month}-{year} {time}"
                publish_date = datetime.strptime(formatted_date, '%d-%m-%y %H:%M')
                return publish_date
            elif ',' in date_time_str:
                # Case: "אתמול, HH:MM"
                date_str, time = date_time_str.split(', ')
                if date_str == "אתמול":
                    yesterday = datetime.now() - timedelta(days=1)
                    year = yesterday.strftime('%y')
                    month = yesterday.strftime('%m')
                    day = yesterday.strftime('%d')
                    formatted_date = f"{day}-{month}-{year} {time}"
                    publish_date = datetime.strptime(formatted_date, '%d-%m-%y %H:%M')
                    return publish_date
            else:
                #case : HH:MM
                today = datetime.now()
                year = today.strftime('%y')
                month = today.strftime('%m')
                day = today.strftime('%d')
                formatted_date = f"{day}-{month}-{year} {date_time_str}"
                publish_date = datetime.strptime(formatted_date, '%d-%m-%y %H:%M')
                return publish_date 
        except Exception as e:
            print(e)
            return None
    
    def get_article(self,link , article_type):
        article_data=""
        title=""
        try:
            response = requests.get(link)
            response.raise_for_status()

            self.article_soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
            publish_date = self.get_publish_date()
            all_content = self.article_soup.find_all(['p', 'h1', 'h2','strong'])
            for tag in all_content:
                if tag.name == 'h1':
                    title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data+=tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data+=" "
            article = Article(link,article_data, title,publish_date,article_type,self.site_name)
            return article
        except requests.RequestException as e:
            print(f"Error fetching article from {link}: {e}")
            return -1

if __name__ == '__main__':
    n12_scrapper = N13_Scrapper(N13_BASE_URL,"N13",N13_NEWS_TYPE)
    n12_scrapper.fetch_articles_and_commit()


