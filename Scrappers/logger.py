import logging
import os
import datetime
import sys


class Logger:
    def __init__(self):
        self._configure_logger()

    def _configure_logger(self):
        # Create a 'logs' directory if it doesn't exist
        if not os.path.exists("logs"):
            os.makedirs("logs")

        # Configure logging
        log_filename = os.path.join(
            "logs", datetime.datetime.now().strftime("%Y-%m-%d") + ".log"
        )
        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
            handlers=[logging.FileHandler(log_filename, encoding="utf-8"),logging.StreamHandler(sys.stdout)],
        )

        self.logger = logging.getLogger(__name__)

    def log_info(self, message):
        self.logger.info(message)

    def log_warning(self, message):
        self.logger.warning(message)

    def log_error(self, message):
        self.logger.error(message)

    def log_critical(self, message):
        self.logger.critical(message)


logger = Logger()
