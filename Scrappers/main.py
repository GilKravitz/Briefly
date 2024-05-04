from concurrent.futures import ThreadPoolExecutor
from configuration.NewsConfig import (
    N12_BASE_URL,
    N12_NEWS_TYPE,
    N12_ONLY_RELEVANT_LINKS,
    N12_PROBLEMATIC_LINKS,
)
from configuration.NewsConfig import (
    N13_BASE_URL,
    N13_NEWS_TYPE,
    N13_ONLY_RELEVANT_LINKS,
)
from configuration.NewsConfig import (
    YNET_BASE_URL,
    YNET_NEWS_TYPE,
    YNET_ONLY_RELEVANT_LINKS,
)
from configuration.NewsConfig import NEWS_SITES
from n12 import N12_Scrapper
from n13 import N13_Scrapper
from ynet import Ynet_Scrapper
from logger import logger


def main(news_site):
    try:
        if news_site == "N12":
            n12_scrapper = N12_Scrapper(
                N12_BASE_URL,
                news_site,
                N12_NEWS_TYPE,
                N12_ONLY_RELEVANT_LINKS,
                N12_PROBLEMATIC_LINKS,
            )
            n12_scrapper.fetch_articles_and_commit()
        elif news_site == "N13":
            n13_scrapper = N13_Scrapper(
                N13_BASE_URL, news_site, N13_NEWS_TYPE, N13_ONLY_RELEVANT_LINKS
            )
            n13_scrapper.fetch_articles_and_commit()
        elif news_site == "YNET":
            ynet_scrapper = Ynet_Scrapper(
                YNET_BASE_URL, news_site, YNET_NEWS_TYPE, YNET_ONLY_RELEVANT_LINKS
            )
            ynet_scrapper.fetch_articles_and_commit()
        else:
            logger.log_error(f"{news_site} is invalid news site!")
        logger.log_info(
            f"{news_site} fetch all articles and commit them to the database."
        )
        print(f"{news_site} fetch all articles and commit them to the database")
    except Exception as e:
        logger.log_critical(f"{e} : {news_site} is invalid ")


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=len(NEWS_SITES)) as executor:
        executor.map(main, NEWS_SITES)
