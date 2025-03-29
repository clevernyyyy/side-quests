from celery import shared_task

from django.conf import settings
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.core.exceptions import ValidationError
from .models import Badge

import requests
import json


BADGE_LEADERBOARD_BASE_URL = settings.BADGE_LEADERBOARD_BASE_URL
TOKEN = settings.BADGE_LEADERBOARD_API_TOKEN
headers = {"X-API-Key": TOKEN}

def save_model_from_json(json_data):
    try:
         model_instance = Badge(**json_data)
         model_instance.full_clean()
         model_instance.save()
         return model_instance
    except TypeError as e:
        raise ValueError(f"Incorrect data format: {e}")
    except ValidationError as e:
        raise ValueError(f"Validation error: {e}")


@shared_task
def my_task():
    
    print('Hello from Celery!')
    
    return


@shared_task
def sync_badge_scores():
    response = requests.get(f"{BADGE_LEADERBOARD_BASE_URL}/getBadges", headers=headers)

    for item in response.json():
        try:
            instance = save_model_from_json(item)
            print(f"Model saved with ID: {instance.id}")
        except ValueError as e:
            print(f"Error saving model: {e}")