import base64
import boto3
import requests
import os
import logging

 
class ImageUploader:
    # aws credentials
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    logger = logging.getLogger(__name__)

    # aws s3 bucket configuration
    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id,
                        aws_secret_access_key=aws_secret_access_key)
    bucket_name = os.getenv('AWS_BUCKET_NAME')

    @classmethod
    def generate_file_name(cls,url):
        file_extension = url.split('.')[-1]
        random_file_name = base64.urlsafe_b64encode(os.urandom(6)).decode('utf-8')
        return f'{random_file_name}.{file_extension}'

    @classmethod
    def upload_image_to_s3(cls,url):
        # create file name
        file_name = cls.generate_file_name(url)
        
        response = None
        try:
            # download the image
            response = requests.get(url)
        except Exception as e:
            cls.logger.error(f'Error downloading image from {url} - {e}')
            return None

        # upload the image to s3 bucket and remove the file
        with open(file_name, 'wb') as f:
            f.write(response.content)
            cls.s3.Bucket(cls.bucket_name).upload_file(file_name, file_name)
            print(f'{file_name} uploaded to {cls.bucket_name}')
            cls.logger.info(f'{url} uploaded to https://drwx9nycxbcad.cloudfront.net/{file_name}')
            
        os.remove(file_name)
        return f'https://drwx9nycxbcad.cloudfront.net/{file_name}'
        # image is available at the following url in the cloudfront distribution:
        # https://drwx9nycxbcad.cloudfront.net/{file_name}