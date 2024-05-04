from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json
import os
from configuration.NewsConfig import NewsCategoryConvert
from logger import logger

project_dir_path = os.path.dirname(os.path.abspath(__file__))
config_file_path = os.path.join(project_dir_path, "DbConfig.json")
with open(config_file_path) as f:
    config = json.load(f)

DB_HOST = config["DB_HOST"]
DB_PORT = config["DB_PORT"]
DB_NAME = config["DB_NAME"]
DB_USER = config["DB_USER"]
DB_PASSWORD = config["DB_PASSWORD"]
DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DB_URL)

# Base class for ORM models
Base = declarative_base()


# Define the Article ORM model
class Article(Base):
    __tablename__ = "scraped_articles"

    link = Column("link", String, primary_key=True)
    data = Column("data", String)
    title = Column("title", String, nullable=False)
    publish_date = Column("publish_date", DateTime)
    category = Column("category", String)
    image = Column("image", String)
    source = Column("source", String, nullable=False)


def connect():
    # Create session
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def disconnect(session):
    session.close()


def check_duplicate_article(link_to_check):
    try:
        session = connect()
        existing_article = (
            session.query(Article).filter(Article.link == link_to_check).first()
        )
        disconnect(session)
        # Check if the article link exists
        if existing_article:
            logger.log_warning(f"Duplicate article was found : {link_to_check}")
            return True
        else:
            return False
    except Exception as e:
        logger.log_critical(f"{e} : Error occured on connection to the database")
        return True


def commit_article(article):
    try:
        session = connect()
        article.category = NewsCategoryConvert.convert_site_category_to_global_category(
            article.category
        )
        new_article_for_db = Article(
            link=article.link,
            data=article.data,
            title=article.title,
            publish_date=article.publish_date,
            category=article.category,
            image=article.image,
            source=article.source,
        )
        session.add(new_article_for_db)
        session.commit()
        disconnect(session)
        return True
    except Exception as e:
        logger.log_critical(f"{e} : Error occured while trying to commit article")
        return False
