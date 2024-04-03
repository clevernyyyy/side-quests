from django.db import models
from django.contrib.auth.models import User

class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    terminating_score = models.FloatField(default=0)
    web_score = models.IntegerField(default=0)
    escape_score = models.IntegerField(default=0)
    badge_score = models.IntegerField(default=0)
    radio_score = models.IntegerField(default=0)
    lockpicking_score = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}"