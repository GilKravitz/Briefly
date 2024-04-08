import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

origin_url = "https://www.ynet.co.il"
newsType = ["news/category/185" , "sport"] # news/category/185 = politics in ynet. 

def filter_links(href):
    return href and 'article' in href
            
def print_article(link):
    article=""
    #need to check against the database if the link exists.
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
        all_content = soup.find_all(['span', 'h1', 'h2','strong'])
        print("------------------------------------------start----------------------------------------------")
        for tag in all_content:
            if tag.name == 'span' and tag.get('data-text') != 'true':
                continue
            article+=tag.get_text(strip=True).encode('utf-8').decode('utf-8')
            article+=" "
        print(article)#for tests purposes
        print("------------------------------------------end----------------------------------------------")
        #send the article to the database.
        #return successful code status.
    else:
        pass
        #reuturn error code status
        
def main(type):
    response = requests.get(origin_url + "/" + type)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        article_links = set()
        max_links = 3 #number of actual article's links.
        skip_links = 3
        counter = 0

        for a_tag in soup.find_all('a', href=filter_links):
            if counter < skip_links:
                counter += 1
                continue

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
    print("----------------------------------------------------")
            
if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=len(newsType)) as executor:
        executor.map(main, newsType)







