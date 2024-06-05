from abc import ABC, abstractmethod
import requests
from bs4 import BeautifulSoup
from configuration.NewsConfig import NUMBER_OF_ARTICLES
from db.db import check_duplicate_article, commit_article
from logger import logger


class BaseScrapper(ABC):
    def __init__(
        self,
        base_url,
        site_name,
        news_type,
        relevant_links_filter,
        unrelevant_links_filter=None,
    ):
        self.base_url = base_url
        self.site_name = site_name
        self.news_type = news_type  # case : Politics , Sport...
        self.relevant_links_filter = relevant_links_filter
        self.unrelevant_links_filter = unrelevant_links_filter
        self.counter = 0  # counter of articles
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    def filter_unrelevant_links(self, link):
        if self.unrelevant_links_filter:  # Not every scrapper has unrelevant links.
            for unrelevant_link_filter in self.unrelevant_links_filter:
                if unrelevant_link_filter in link:
                    return True
        for relevant_link_filter in self.relevant_links_filter:
            if relevant_link_filter in link:
                return False
        return True

    def get_image_link(self):
        try:
            article_tag = self.article_soup.find("article")
            if article_tag:
                figure_tag = article_tag.find("figure")
            else:
                figure_tag = self.article_soup.find("figure")

            if figure_tag:
                # Find the img tag inside the figure tag
                img_tag = figure_tag.find("img")
                if img_tag:
                    # Extract src attribute
                    image_link = img_tag.get("src")
                    return image_link
            else:
                img_tag = article_tag.find("img")
                if img_tag:
                    # Extract src attribute
                    image_link = img_tag.get("src")
                    return image_link
                else:
                    return None
        except Exception as e:
            logger.log_warning(
                f"{e} : didnt fetch imageLink from article , img tag : {img_tag}"
            )

    @abstractmethod
    def filter_fetched_links(self, href):
        pass

    def get_articles_links(self, article_type):
        try:
            response = requests.get(
                self.base_url + "/" + article_type, headers=self.headers
            )
            if response.status_code == 200:
                self.article_type_homepage_soup = BeautifulSoup(
                    response.text, "html.parser"
                )
                articles_links = set()
                all_a_tags_in_page = self.article_type_homepage_soup.find_all(
                    "a", href=self.filter_fetched_links
                )
                for a_tag in all_a_tags_in_page:
                    if len(articles_links) < NUMBER_OF_ARTICLES:
                        link = a_tag.get("href")
                        if self.filter_unrelevant_links(link):
                            continue
                        if link.startswith(self.base_url):
                            full_link = link
                        else:
                            full_link = self.base_url + str(link)
                        if check_duplicate_article(full_link):
                            continue
                        articles_links.add(full_link)
                    else:
                        break
                articles_links = list(articles_links)[:NUMBER_OF_ARTICLES]
                return articles_links
        except Exception as e:
            logger.log_error(
                f"{e} : Occured on {self.site_name} , article links was {articles_links}"
            )

    @abstractmethod
    def get_article_content(self, link, article_type):
        pass

    def fetch_articles_and_commit(self):
        for article_type in self.news_type:
            article_links = self.get_articles_links(article_type)
            for link in article_links:
                article = self.get_article_content(link, article_type)
                if article == -1:
                    logger.log_warning(f"didnt manage to fetch article from {link}")
                else:
                    if commit_article(article):
                        self.counter += 1
                        logger.log_info(
                            f"-{self.counter}- {article.title} from {article.source} Successfully committed article to database"
                        )
                    else:
                        logger.log_error(f"Failed to commit article to database")
