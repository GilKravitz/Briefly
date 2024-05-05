# class that manage the postgres db connection 

import psycopg

import os
import logging

class DB:
    def __init__(self):
        self.dbname = os.getenv('DB_NAME')
        self.user = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
        self.host = os.getenv('DB_HOST')
        self.conn = None
        self.cursor = None
        self.logger = logging.getLogger(__name__)

    def connect(self):
        try:
            # conninfo = f"dbname={self.dbname} user={self.user} password={self.password} host={self.host}"
            conninfo = {
                'dbname': self.dbname,
                'user': self.user,
                'password': self.password,
                'host': self.host
            }
            self.conn = psycopg.connect(**conninfo)
            self.cursor = self.conn.cursor()
            print('Connected to db')
            self.logger.info('Connected to db')
        except Exception as e:
            print('Error connecting to db', e)
            self.logger.error('Error connecting to db', e)
    

    def close(self):
        self.cursor.close()
        self.conn.close()
        self.logger.info('Closed db connection')

    def execute(self, query):
        try:
            self.cursor.execute(query)
            self.logger.info(f'Executed query: {query}')
        except Exception as e:
            self.logger.error(f'Error executing query: {query}', e)

        if self.cursor.description:
            return self.cursor.fetchall()
        else:
            return None

    def execute_params(self, query, params):
        self.cursor.execute(query, params)
        return self.cursor.fetchall()

    def execute_named_params(self, query, params):
        self.cursor.execute(query, params)
        return self.cursor.fetchall()

    def commit(self):
        self.conn.commit()
        self.logger.info('Committed transaction')

    def rollback(self):
        self.conn.rollback()

    
    def get_null_img_articles_id(self):
        query = "SELECT id,image FROM merged_articles WHERE s3_image IS NULL AND image IS NOT NULL"
        res =  self.execute(query)
        self.logger.info(f'Getting articles with null s3_image: {len(res)}')
        return res
    
    def update_s3image_url(self, article_id, url):
        query = f"UPDATE merged_articles SET s3_image = '{url}' WHERE id = {article_id}"
        self.execute(query)
        self.commit()
        self.logger.info(f'Updated article {article_id} with s3_image url: {url}')
    