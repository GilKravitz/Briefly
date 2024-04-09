import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
from config import N13_BASE_URL , N13_SOURCE , N13_NEWS_TYPE

ARTICLE_SOURCE = "N13"
BASE_URL = "https://13tv.co.il/news"
newsType = ["politics/politics/"] # change this to add more news types..


def filter_links(href):
    return href and 'item/news' in href

def print_article(link):
    article=""
    str_link = str(link)
    full_link = BASE_URL+str_link
    #need to check against the database if the full_link exists.
    response = requests.get(full_link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
        all_content = soup.find_all(['p', 'h1', 'h2','strong'])
        print("------------------------------------------start----------------------------------------------")
        for tag in all_content:
            if tag.name == 'h1':
                    title = tag.get_text(strip=True).encode('utf-8').decode('utf-8')
            article+=tag.get_text(strip=True).encode('utf-8').decode('utf-8')
            article+=" "
        print(title)
        print(article)#for tests purposes
        print("------------------------------------------end----------------------------------------------")
        #send the article to the database.
        #return successful code status.
    else:
        pass
        #return error code status
        
def main(type):
    response = requests.get(BASE_URL + "/" + type)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        article_links = set()
        max_links = 3 #number of actual article's links.

        for a_tag in soup.find_all('a', href=filter_links):

            if len(article_links) < max_links:
                link = a_tag.get('href')
                article_links.add(link)
            else:
                break

        article_links = list(article_links)[:max_links]
        for link in article_links:
            print_article(link)
    else:
        print(f"Error: {response.status_code}")
            
if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=len(newsType)) as executor:
        executor.map(main, newsType)




