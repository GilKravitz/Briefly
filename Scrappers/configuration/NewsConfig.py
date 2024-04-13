import json
import os

# Get the absolute path to the directory containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))
config_file_path = os.path.join(script_dir, 'NewsConfig.json')

with open(config_file_path) as f:
    config = json.load(f)



N12_BASE_URL = config['N12']['BASE_URL']
N12_NEWS_TYPE = config['N12']['NEWS_TYPE']

N13_BASE_URL = config['N13']['BASE_URL']
N13_NEWS_TYPE = config['N13']['NEWS_TYPE']

YNET_BASE_URL = config['YNET']['BASE_URL']
YNET_NEWS_TYPE = config['YNET']['NEWS_TYPE']

NUMBER_OF_ARTICLES = config['NUMBER_OF_ARTICLES']
NEWS_SITES = config['NEWS_SITES']