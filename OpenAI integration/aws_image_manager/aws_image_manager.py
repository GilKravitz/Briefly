from psycopg2.extensions import connection
import base64
import boto3
import requests
import os
import logging

class AWSImageManager:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def insert_images_to_aws(self, articles_id_and_images):
        '''Uploads images to AWS S3 for articles that do not already have an S3 image URL, and returns 
        a list of tuples containing article IDs and their newly assigned S3 image URLs.

        This method retrieves articles that have an image URL but lack an S3 image URL, uploads their images to 
        AWS S3 using `ImageUploader`, and then provides a list of tuples containing the updated IDs and URLs.

        Args:
            articles_id_and_images (list[tuple[int, str]]): A list of tuples containing article IDs and original image URLs.

        Returns:
            list[tuple[int, str]]: A list of tuples containing article IDs and newly assigned S3 image URLs.
        '''
        articles_images_url = []
        for article_id ,img_url in articles_id_and_images:
            self.logger.info(f'Processing article with id: {article_id}')
            s3_url = ImageUploader.upload_image_to_s3(img_url)
            articles_images_url.append((article_id, s3_url))
        
        return articles_images_url

 
class ImageUploader:
    # AWS credentials
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    logger = logging.getLogger(__name__)

    # AWS S3 bucket configuration
    s3 = boto3.resource(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key
    )
    bucket_name = os.getenv('AWS_BUCKET_NAME')

    @classmethod
    def generate_file_name(cls, url: str) -> str:
        '''Generates a unique filename using base64 encoding based on a given URL.

        Args:
            url (str): The original URL of the image.

        Returns:
            str: A randomly generated filename with the same extension as the input URL.
        '''
        file_extension = url.split('.')[-1]
        random_file_name = base64.urlsafe_b64encode(os.urandom(6)).decode('utf-8')
        return f'{random_file_name}.{file_extension}'

    @classmethod
    def upload_image_to_s3(cls, url: str) -> str:
        '''Downloads an image from the specified URL and uploads it to AWS S3.

        Args:
            url (str): The URL of the image to be downloaded and uploaded.

        Returns:
            str: The S3 URL of the uploaded image, or None if the upload failed.
        '''
        file_name = cls.generate_file_name(url)
        response = None

        try:
            response = requests.get(url)
        except Exception as e:
            cls.logger.error(f'Error downloading image from {url} - {e}')
            return None

        # Upload the image to the S3 bucket
        with open(file_name, 'wb') as f:
            f.write(response.content)
            cls.s3.Bucket(cls.bucket_name).upload_file(file_name, file_name)
            cls.logger.info(f'{url} uploaded to https://drwx9nycxbcad.cloudfront.net/{file_name}')

        os.remove(file_name)

        return f'https://drwx9nycxbcad.cloudfront.net/{file_name}'
        # image is available at the following url in the cloudfront distribution:
        # https://drwx9nycxbcad.cloudfront.net/{file_name}