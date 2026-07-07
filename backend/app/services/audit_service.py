import random
import time
import logging

logger = logging.getLogger(__name__)

def notify_scoring():

    delay = random.randint(1, 3)

    time.sleep(delay)

    if random.random() < 0.10:

        raise Exception(
            "Scoring failed"
        )

def notify_scoring_safely():

    try:

        notify_scoring()

    except Exception:

        logger.exception("Scoring notification failed")
