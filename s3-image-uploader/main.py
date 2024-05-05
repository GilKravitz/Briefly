from dotenv import load_dotenv

from ImageUploader import ImageUploader
from db import DB
import os
import logging

# Set up logging
logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    load_dotenv()
    db = DB()
    db.connect()
    articles = db.get_null_img_articles_id()
    for id,img_url in articles:
        print("id: ",id)
        logger.info(f'Processing article with id: {id}')
        s3_url = ImageUploader.upload_image_to_s3(img_url)
        db.update_s3image_url(id,s3_url)

        
    db.close()

   