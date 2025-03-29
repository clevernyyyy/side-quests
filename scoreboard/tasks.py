from celery import shared_task

from django.db.models import Sum
from django.db.models.functions import Coalesce
from .models import Badge


@shared_task
def my_task():
    
    print('Hello from Celery!')
    
    return