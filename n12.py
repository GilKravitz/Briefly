import requests
from bs4 import BeautifulSoup

origin_url = "https://www.mako.co.il"

def filter_links(href):
    return href and 'Article' in href


def print_article(link):
    article=""
    str_link = str(link)
    full_link = origin_url+str_link
    #need to check against the database if the full_link exists.
    response = requests.get(full_link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')
        all_content = soup.find_all(['p', 'h1', 'h2','strong'])
        print("------------------------------------------start----------------------------------------------")
        for tag in all_content:
            if not tag.find_parent('section', class_='mako_comments') and 'content' not in tag.get('class', []):
                article+= tag.get_text(strip=True).encode('utf-8').decode('utf-8')
                article+=" "
        print(article)#for tests purposes
        print("------------------------------------------end----------------------------------------------")
        #send the article to the database.
        #return successful code status.
    else:
        pass
        #reuturn error code status
        
def main():
    newsType = ["news-military" , "news-sport"] # change this to add more news types..
    for type in newsType:
        response = requests.get(origin_url + "/" + type)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            article_links = set()
            max_links = 3
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
                print(link)
        else:
            print(f"Error: {response.status_code}")
            
if __name__ == '__main__':
    main()



