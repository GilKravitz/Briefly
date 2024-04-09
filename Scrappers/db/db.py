from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DB_URL

engine = create_engine(DB_URL)



# Base class for ORM models
Base = declarative_base()

# Define the Article ORM model
class Article(Base):
    __tablename__ = 'scraped_articles' 

    link = Column('link', String, primary_key=True)
    data = Column('data', String)
    title = Column('title', String, nullable=False)
    publish_date = Column('publish_date', DateTime)
    category = Column('category', String)
    source = Column('source', String, nullable=False)

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
        existing_article = session.query(Article).filter(Article.link == link_to_check).first()
        disconnect(session)
        # Check if the article link exists
        if existing_article:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return True

def commit_article(article):
    try:
        session = connect()
        new_article_for_db = Article(link=article.link, data=article.data, title=article.title, publish_date=article.publish_date, category=article.category, source=article.source)
        session.add(new_article_for_db)
        session.commit()
        disconnect(session)
        return True
    except Exception as e:
        print(e)
        return False