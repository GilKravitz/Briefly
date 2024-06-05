from datetime import datetime
from sqlalchemy import Column, Integer, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class TableModels:
    class SourceTable(Base):
        __tablename__ = 'sources'
        id = Column(Integer, primary_key=True, index=True)
        name = Column(Text, nullable=False, unique=True)
        url = Column(Text, nullable=False, unique=True)

    class CategoryTable(Base):
        __tablename__ = 'categories'
        id = Column(Integer, primary_key=True, index=True)
        name = Column(Text, nullable=False, unique=True)

    class ScrapedArticleTable(Base):
        __tablename__ = 'scraped_articles'
        id = Column(Integer, primary_key=True, index=True)
        title = Column(Text, nullable=False)
        content = Column(Text, nullable=False)
        link = Column(Text, nullable=False, unique=True)
        image_url = Column(Text, nullable=False)
        publish_date = Column(DateTime, nullable=False)
        created_at = Column(DateTime, default=datetime.utcnow)
        source_id = Column(Integer, ForeignKey('sources.id', ondelete='CASCADE'), nullable=False)
        category_id = Column(Integer, ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)
        is_processed = Column(Boolean, default=False)

        source = relationship('SourceTable')
        category = relationship('CategoryTable')

    class ClusterTable(Base):
        __tablename__ = 'clusters'
        id = Column(Integer, primary_key=True, index=True)
        created_at = Column(DateTime, default=datetime.utcnow)

    class ArticlesClusterTable(Base):
        __tablename__ = 'articles_clusters'
        scraped_article_id = Column(Integer, ForeignKey('scraped_articles.id', ondelete='CASCADE'), primary_key=True)
        cluster_id = Column(Integer, ForeignKey('clusters.id', ondelete='CASCADE'), primary_key=True)

    class GeneratedArticleTable(Base):
        __tablename__ = 'generated_articles'
        id = Column(Integer, primary_key=True, index=True)
        title = Column(Text, nullable=False)
        content = Column(Text, nullable=False)
        image_url = Column(Text, nullable=False)
        publish_date = Column(DateTime, default=datetime.utcnow)
        cluster_id = Column(Integer, ForeignKey('clusters.id', ondelete='CASCADE'), unique=True, nullable=False)

    class TagTable(Base):
        __tablename__ = 'tags'
        id = Column(Integer, primary_key=True, index=True)
        name = Column(Text, nullable=False, unique=True)

    class GeneratedArticleTagTable(Base):
        __tablename__ = 'generated_articles_tags'
        article_id = Column(Integer, ForeignKey('generated_articles.id', ondelete='CASCADE'), primary_key=True)
        tag_id = Column(Integer, ForeignKey('tags.id', ondelete='CASCADE'), primary_key=True)
