from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Score(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    terminating_score = models.FloatField(default=0)
    web_score = models.IntegerField(default=0)
    escape_score = models.IntegerField(default=0)
    badge_score = models.IntegerField(default=0)
    radio_score = models.IntegerField(default=0)
    lockpicking_score = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)
    computed_score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}"

@receiver(post_save, sender=Score)
def calculate_score(sender, instance, created, **kwargs):
    if created:
        if instance.terminating_score != 0:
            instance.computed_score = 5 + instance.web_score + instance.escape_score + instance.badge_score + instance.radio_score + instance.lockpicking_score
        else:
            instance.computed_score = instance.web_score + instance.escape_score + instance.badge_score + instance.radio_score + instance.lockpicking_score
        instance.save()

class Badge(models.Model):
    machine_id = models.CharField(unique=True)
    initials = models.CharField(null=True, blank=True)
    deep_easy_hs = models.FloatField(null=True, blank=True)
    deep_easy_win_count = models.IntegerField(null=True, blank=True)
    deep_easy_fail_count = models.IntegerField(null=True, blank=True)
    deep_norm_hs = models.FloatField(null=True, blank=True)
    deep_norm_win_count = models.IntegerField(null=True, blank=True)
    deep_norm_fail_count = models.IntegerField(null=True, blank=True)
    deep_hard_hs = models.FloatField(null=True, blank=True)
    deep_hard_win_count = models.IntegerField(null=True, blank=True)
    deep_hard_fail_count = models.IntegerField(null=True, blank=True)
    deep_official_hs = models.FloatField(null=True, blank=True)
    deep_official_win_count = models.IntegerField(null=True, blank=True)
    deep_official_fail_count = models.IntegerField(null=True, blank=True)
    added = models.DateTimeField(null=True, blank=True)
    updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.machine_id