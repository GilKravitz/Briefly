import json

with open('config.json') as f:
    config = json.load(f)

DB_HOST = config['DATABASE']['DB_HOST']
DB_PORT = config['DATABASE']['DB_PORT']
DB_NAME = config['DATABASE']['DB_NAME']
DB_USER = config['DATABASE']['DB_USER']
DB_PASSWORD = config['DATABASE']['DB_PASSWORD']
DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

N12_BASE_URL = config['N12']['BASE_URL']
N12_NEWS_TYPE = config['N12']['NEWS_TYPE']

N13_BASE_URL = config['N13']['BASE_URL']
N13_NEWS_TYPE = config['N13']['NEWS_TYPE']

YNET_BASE_URL = config['YNET']['BASE_URL']
YNET_NEWS_TYPE = config['YNET']['NEWS_TYPE']

NUMBER_OF_ARTICLES = config['NUMBER_OF_ARTICLES']
NEWS_SITES = config['NEWS_SITES']