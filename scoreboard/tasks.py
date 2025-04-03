from celery import shared_task

from django.conf import settings
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from .models import Badge, Score

import requests


BADGE_LEADERBOARD_BASE_URL = settings.BADGE_LEADERBOARD_BASE_URL
TOKEN = settings.BADGE_LEADERBOARD_API_TOKEN
headers = {"X-API-Key": TOKEN}

def save_model_from_json(json_data):

    try:
        badge = Badge.objects.get(machine_id=json_data['machine_id'])

        # badge exists, update all attributes except machine id
        for attr, value in json_data.items():
            if attr != 'machine_id':
                setattr(badge, attr, value)
        
        badge.full_clean()
        badge.save()
        return badge
    except TypeError as e:
        raise ValueError(f"Incorrect data format: {e}")
    except ValidationError as e:
        raise ValueError(f"Validation error: {e}")   
    except ObjectDoesNotExist:

        try:
            # badge doesn't exist, add new instance
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

@shared_task
def transfer_official_hs_to_score_table():
    # pull all score instances and associated user's badge
    scores = Score.objects.all()

    for score in scores:
        # iterate through each score record
        
        # look up badge for this score record's user
	if score.user.badge.pk is not None:
            badge = Badge.objects.get(pk=score.user.badge.pk)

            # set official hs to score instance badge_score
            if badge.deep_official_hs is not None:
                score.badge_score = badge.deep_official_hs

                # save score record
                score.save()


    

    # save
