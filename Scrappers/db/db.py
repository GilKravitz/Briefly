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
    content = Column("content", String, nullable=False)
    title = Column("title", String, nullable=False)
    publish_date = Column("publish_date", DateTime)
    category_id = Column("category_id", int, nullable=False)
    image_url = Column("image_url", String)
    source_id = Column("source_id", int, nullable=False)


class Sources(Base):
    __tablename__ = "sources"

    id = Column(int, primary_key=True)
    name = Column(String, unique=True)
    url = Column(String, unique=True)


class Categories(Base):
    __tablename__ = "categories"

    id = Column(int, primary_key=True)
    name = Column(String, unique=True)


def connect():
    # Create session
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def disconnect(session):
    session.close()


def convert_source_to_id(source):
    try:
        session = connect()
        source_db = session.query(Sources).filter(Sources.name == source).first()
        disconnect(session)
        if source_db:
            return source_db[0]  # id of the source
        else:
            logger.log_warning(f"Wrong source of article : {source}")
    except Exception as e:
        logger.log_critical(f"{e} : Error occured on connection to the database")
        return True


def convert_category_to_id(category):
    try:
        session = connect()
        category_db = (
            session.query(Categories).filter(Categories.name == category).first()
        )
        disconnect(session)
        if category_db:
            return category_db[0]  # id of the source
        else:
            logger.log_warning(f"Wrong source of article : {category}")
    except Exception as e:
        logger.log_critical(f"{e} : Error occured on connection to the database")
        return True


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
        # convert category to id and source to id
        new_article_for_db = Article(
            link=article.link,
            content=article.data,
            title=article.title,
            publish_date=article.publish_date,
            category_id=convert_category_to_id(article.category),
            image_url=article.image,
            source_id=convert_source_to_id(article.source),
        )
        session.add(new_article_for_db)
        session.commit()
        disconnect(session)
        return True
    except Exception as e:
        logger.log_critical(f"{e} : Error occured while trying to commit article")
        return False
