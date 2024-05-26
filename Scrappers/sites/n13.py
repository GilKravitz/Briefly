import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from baseScrapper import BaseScrapper
from article import Article
from logger import logger


class N13_Scrapper(BaseScrapper):
    def __init__(self, base_url, site_name, news_type, relevant_links):
        BaseScrapper.__init__(self, base_url, site_name, news_type, relevant_links)

    def filter_fetched_links(self, href):
        return href and "item" in href

    def get_article_publish_date(self):
        try:
            display_date_span = self.article_soup.select_one(
                'span[class^="ArticleCreditsstyles__DateContainer"]'
            )
            date_time_str = display_date_span.text.strip()
            if "." in date_time_str:
                # Case: "dd:mm hh:mm"
                date = date_time_str.split(",")[0]
                time = date_time_str.split(",")[1]
                year = datetime.now().strftime("%y")
                month = date.split(".")[1]
                day = date.split(".")[0]
                formatted_date = f"{day}-{month}-{year} {time}"
                publish_date = datetime.strptime(formatted_date, "%d-%m-%y %H:%M")
                return publish_date
            elif "," in date_time_str:
                # Case: "אתמול, HH:MM"
                date_str, time = date_time_str.split(", ")
                if date_str == "אתמול":
                    yesterday = datetime.now() - timedelta(days=1)
                    year = yesterday.strftime("%y")
                    month = yesterday.strftime("%m")
                    day = yesterday.strftime("%d")
                    formatted_date = f"{day}-{month}-{year} {time}"
                    publish_date = datetime.strptime(formatted_date, "%d-%m-%y %H:%M")
                    return publish_date
            else:
                # case : HH:MM
                today = datetime.now()
                year = today.strftime("%y")
                month = today.strftime("%m")
                day = today.strftime("%d")
                formatted_date = f"{day}-{month}-{year} {date_time_str}"
                publish_date = datetime.strptime(formatted_date, "%d-%m-%y %H:%M")
                return publish_date
        except Exception as e:
            logger.log_warning(
                f"{e} : No date found in article , display date span was {display_date_span}"
            )
            return None

    def get_article_content(self, link, article_type):
        article_data = ""
        title = ""
        try:
            response = requests.get(link)
            response.raise_for_status()
            self.article_soup = BeautifulSoup(
                response.content, "html.parser", from_encoding="utf-8"
            )
            article_publish_date = self.get_article_publish_date()
            if article_publish_date is None:
                return -1

            imageLink = self.get_image_link()
            if not imageLink:
                return -1
            all_content = []
            content_article = self.article_soup.find(
                "article", class_=lambda c: c and c.startswith("Articlestyles__Content")
            )
            if (
                content_article is None
            ):  # didnt find article tag in html form , so doing the usual way.
                content_article = self.article_soup.find_all(
                    "div", class_=lambda c: c and c.startswith("ArticleTimeLinestyles")
                )
                for contentDiv in content_article:
                    all_content.extend(
                        contentDiv.find_all(["p", "h1", "h2", "strong"])
                        if content_article
                        else []
                    )
            else:
                all_content = (
                    content_article.find_all(["p", "h1", "h2", "strong"])
                    if content_article
                    else []
                )
            for tag in all_content:
                if tag.name == "h1":
                    title = tag.get_text(strip=True).encode("utf-8").decode("utf-8")
                article_data += tag.get_text(strip=True).encode("utf-8").decode("utf-8")
                article_data += " "
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
            logger.log_warning(
                f"{e} : Error fetching article from {link} , content was {all_content}"
            )
            return -1
