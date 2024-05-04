import json
import os
from enum import Enum

# Get the absolute path to the directory containing this script
project_dir = os.path.dirname(os.path.abspath(__file__))
config_file_path = os.path.join(project_dir, "NewsConfig.json")
with open(config_file_path) as f:
    config = json.load(f)

N12_BASE_URL = config["N12"]["BASE_URL"]
N12_NEWS_TYPE = config["N12"]["NEWS_TYPE"]
N12_ONLY_RELEVANT_LINKS = config["N12"]["ONLY_RELEVANT_LINKS"]
N12_PROBLEMATIC_LINKS = config["N12"]["PROBLEMATIC_LINKS"]

N13_BASE_URL = config["N13"]["BASE_URL"]
N13_NEWS_TYPE = config["N13"]["NEWS_TYPE"]
N13_ONLY_RELEVANT_LINKS = config["N13"]["ONLY_RELEVANT_LINKS"]

YNET_BASE_URL = config["YNET"]["BASE_URL"]
YNET_NEWS_TYPE = config["YNET"]["NEWS_TYPE"]
YNET_ONLY_RELEVANT_LINKS = config["YNET"]["ONLY_RELEVANT_LINKS"]

NUMBER_OF_ARTICLES = config["NUMBER_OF_ARTICLES"]
NEWS_SITES = config["NEWS_SITES"]


class NewsCategoryConvert(Enum):
    Politics = [N12_NEWS_TYPE[0], N13_NEWS_TYPE[0], YNET_NEWS_TYPE[0]]
    Sport = [N12_NEWS_TYPE[1], N13_NEWS_TYPE[1], YNET_NEWS_TYPE[1]]
    Economics = [N12_NEWS_TYPE[2], N13_NEWS_TYPE[2], YNET_NEWS_TYPE[2]]
    Food = [N12_NEWS_TYPE[3], N13_NEWS_TYPE[3], YNET_NEWS_TYPE[3]]

    @classmethod
    def convert_site_category_to_global_category(cls, site_category):
        for category in cls.Politics.value:
            if category in site_category:
                return "Politics"
        for category in cls.Sport.value:
            if category in site_category:
                return "Sport"
        for category in cls.Economics.value:
            if category in site_category:
                return "Economics"
        for category in cls.Food.value:
            if category in site_category:
                return "Food"
        return None
