# Generated by Django 4.2.11 on 2024-04-03 21:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('terminating_score', models.FloatField(default=0)),
                ('web_score', models.IntegerField(default=0)),
                ('escape_score', models.IntegerField(default=0)),
                ('badge_score', models.IntegerField(default=0)),
                ('radio_score', models.IntegerField(default=0)),
                ('lockpicking_score', models.IntegerField(default=0)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('computed_score', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
