import requests
from bs4 import BeautifulSoup
from datetime import datetime
from BaseClasses import Article, BaseScrapper
from logger import logger


class N12_Scrapper(BaseScrapper):
    def __init__(
        self, base_url, site_name, news_type, relevant_links, unrelevant_links
    ):
        BaseScrapper.__init__(
            self, base_url, site_name, news_type, relevant_links, unrelevant_links
        )

    def filter_fetched_links(self, href):
        return href and "Article" in href

    def get_article_publish_date(self):
        try:
            display_date_span = self.article_soup.find("span", class_="display-date")
            date_span = display_date_span.find_all("span")[0]
            time_span = display_date_span.find_all("span")[1]
            date_text = date_span.get_text(strip=True)
            date_text = date_text.split(" ")[-1]  # remove everything except the date.
            time_text = time_span.get_text(strip=True)
            day, month, year = date_text.split(
                "/"
            )  # split the date into days and months and year
            formatted_date = f"{day}-{month}-{year} {time_text}"
            publish_date = datetime.strptime(formatted_date, "%d-%m-%y %H:%M")
            return publish_date
        except Exception as e:
            logger.log_warning(f"{e} : No date found in article")
            return None

    def get_article_content(self, link, article_type):
        article_data = ""
        title = ""
        try:
            response = requests.get(link)
            response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
            self.article_soup = BeautifulSoup(
                response.content, "html.parser", from_encoding="utf-8"
            )
            article_publish_date = self.get_article_publish_date()
            if article_publish_date is None:
                return -1

            imageLink = self.get_image_link()
            content_article = self.article_soup.find("article")
            all_content = (
                content_article.find_all(["p", "h1", "h2", "strong"])
                if content_article
                else []
            )
            # Collect all the data of the article
            for tag in all_content:
                if not tag.find_parent("section", class_="mako_comments") and "content" not in tag.get("class", []) and not (tag.name == "div" and "not_for_print" in tag.get("class", [])) and not tag.find_all("a", recursive=True):
                    if tag.name == "h1":
                        title = tag.get_text(strip=True)
                    article_data += tag.get_text(strip=True) + " "
            article = Article(
                link,
                article_data,
                title,
                article_publish_date,
                article_type,
                imageLink,
                self.site_name,
            )
            return article
        except requests.RequestException as e:
            logger.log_warning(f"{e} : Error fetching article from {link}")
            return -1
