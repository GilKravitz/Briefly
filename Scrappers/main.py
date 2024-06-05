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
from sites.n12 import N12_Scrapper
from sites.n13 import N13_Scrapper
from sites.ynet import Ynet_Scrapper
from logger import logger
import boto3
import os

def main(news_site):
    try:
        if news_site == "n12":
            scrapper = N12_Scrapper(
                N12_BASE_URL,
                news_site,
                N12_NEWS_TYPE,
                N12_ONLY_RELEVANT_LINKS,
                N12_PROBLEMATIC_LINKS,
            )
            scrapper.fetch_articles_and_commit()
        elif news_site == "13tv":
            scrapper = N13_Scrapper(
                N13_BASE_URL, news_site, N13_NEWS_TYPE, N13_ONLY_RELEVANT_LINKS
            )
            scrapper.fetch_articles_and_commit()
        elif news_site == "ynet":
            scrapper = Ynet_Scrapper(
                YNET_BASE_URL, news_site, YNET_NEWS_TYPE, YNET_ONLY_RELEVANT_LINKS
            )
            scrapper.fetch_articles_and_commit()
        else:
            logger.log_error(f"{news_site} is invalid news site!")
        logger.log_info(
            f"{news_site} fetch {scrapper.counter} articles and commit them to the database."
        )
        print(
            f"{news_site} fetch {scrapper.counter} articles and commit them to the database"
        )
    except Exception as e:
        logger.log_critical(
            f"{e} : {news_site} is invalid , scrapper object was {scrapper}"
        )


def notify_scraper_done():
    '''
    Publish a notification to AWS SNS to indicate that the Scraper Service has completed its task.
    
    This function creates a boto3 client for SNS in the specified region and publishes a message
    to the 'text_summarize_done_topic' topic to notify the Text Summarizer Service that it has completed.
    '''
    region = 'il-central-1'

    # AWS account ID where the SNS topic resides
    account_id = os.getenv('AWS_ACCOUNT_ID')
    sns = boto3.client('sns', region_name=region)
    topic_arn = f'arn:aws:sns:{region}:{account_id}:scraper_done_topic'
    
    # Publish a message to the SNS topic
    sns.publish(
        TopicArn=topic_arn,
        Message='Scrappers Service Completed'
    )
if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=len(NEWS_SITES)) as executor:
        executor.map(main, NEWS_SITES)
    notify_scraper_done()
