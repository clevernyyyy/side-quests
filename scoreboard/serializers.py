from rest_framework import serializers
from .models import Score

class ScoreSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Score
        fields = '__all__'
        extra_kwargs = {'username': {'read_only': True}}
