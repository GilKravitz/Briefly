import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from db import check_duplicate_article , commit_article
from config import N12_BASE_URL  , N12_NEWS_TYPE , NUMBER_OF_ARTICLES , NEWS_SITES 
from classes import N12_Article , N13_Article , Ynet_Article


def filter_links(href):
    return href and 'Article' in href

def get_publish_date(soup):
    try:
        display_date_span = soup.find('span', class_='display-date')
        date_span, time_span = display_date_span.find_all('span') # takes the two spans tags 
        date_text = date_span.get_text(strip=True)
        date_text = date_text.split(' ')[-1] # remove everything except the date.
        time_text = time_span.get_text(strip=True)
        day, month, year = date_text.split('/') #split the date into days and months and year
        formatted_date = f"{day}-{month}-{year} {time_text}"
        publish_date = datetime.strptime(formatted_date, '%d-%m-%y %H:%M')
        return publish_date
    except Exception as e:
        print(e)
        return None

def get_article(full_link , article_type):
    article_data = ""
    title = ""

    try:
        # Checks against the database if the link already exists.
        duplicate_article = check_duplicate_article(full_link)
        if duplicate_article:
            return 1

        response = requests.get(full_link , article_type)
        response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
        soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
        publish_date = get_publish_date(soup)
        all_content = soup.find_all(['p', 'h1', 'h2', 'strong'])

        # Collect all the data of the article
        for tag in all_content:
            if not tag.find_parent('section', class_='mako_comments') and 'content' not in tag.get('class', []):
                if tag.name == 'h1':
                    title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data += tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article_data += " "
        
        article = N12_Article(full_link,article_data, title,publish_date,article_type)
        return article
        

    except requests.RequestException as e:
        print(f"Error fetching article from {full_link}: {e}")
        return -1
        
def main(article_type):
        response = requests.get(N12_BASE_URL + "/" + article_type)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            article_links = set() # defined as set to prevent duplicate article links.

            for a_tag in soup.find_all('a', href=filter_links):

                if len(article_links) < NUMBER_OF_ARTICLES:
                    link = a_tag.get('href')
                    article_links.add(link)
                else:
                    break

            article_links = list(article_links)[:NUMBER_OF_ARTICLES]
            for link in article_links:
                str_link = str(link)
                full_link = N12_BASE_URL+str_link
                article = get_article(full_link , article_type)

                commit_article(article) #send it to the database.


        else:
            print(f"Error: {response.status_code}")
            
if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=len(N12_NEWS_TYPE)) as executor:
        executor.map(main, N12_NEWS_TYPE)




