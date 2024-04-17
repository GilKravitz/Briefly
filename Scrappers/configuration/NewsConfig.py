import json
import os
from enum import Enum

# Get the absolute path to the directory containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))
config_file_path = os.path.join(script_dir, 'NewsConfig.json')
with open(config_file_path) as f:
    config = json.load(f)

N12_BASE_URL = config['N12']['BASE_URL']
N12_NEWS_TYPE = config['N12']['NEWS_TYPE']
N12_ONLY_RELEVANT_LINKS = config['N12']['ONLY_RELEVANT_LINKS']
N12_PROBLEMATIC_LINKS = config['N12']['PROBLEMATIC_LINKS']

N13_BASE_URL = config['N13']['BASE_URL']
N13_NEWS_TYPE = config['N13']['NEWS_TYPE']
N13_ONLY_RELEVANT_LINKS = config['N13']['ONLY_RELEVANT_LINKS']

YNET_BASE_URL = config['YNET']['BASE_URL']
YNET_NEWS_TYPE = config['YNET']['NEWS_TYPE']
YNET_ONLY_RELEVANT_LINKS = config['YNET']['ONLY_RELEVANT_LINKS']

NUMBER_OF_ARTICLES = config['NUMBER_OF_ARTICLES']
NEWS_SITES = config['NEWS_SITES']

class NewsCategoryConvert(Enum):
    Politics = lambda: list(map(lambda x: x[0], [N12_NEWS_TYPE, N13_NEWS_TYPE, YNET_NEWS_TYPE]))
    Sport = lambda: list(map(lambda x: x[1], [N12_NEWS_TYPE, N13_NEWS_TYPE, YNET_NEWS_TYPE]))
    Economics = lambda: list(map(lambda x: x[2], [N12_NEWS_TYPE, N13_NEWS_TYPE, YNET_NEWS_TYPE]))
    Food = lambda: list(map(lambda x: x[3], [N12_NEWS_TYPE, N13_NEWS_TYPE, YNET_NEWS_TYPE]))

    @classmethod
    def convert_site_category_to_global_category(cls , site_category):
        for category in cls:
            if site_category in category.value:
                return category.name
        return None