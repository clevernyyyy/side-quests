from django.shortcuts import render
from .models import Score

def scoreboard(request):
    scores = Score.objects.all()  # Retrieve top 10 scores, ordered by score descending
    return render(request, 'scoreboard/scoreboard.html', {'scores': scores})
