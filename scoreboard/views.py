from django.shortcuts import render
from .models import Score

def scoreboard(request):
    scores = Score.objects.all().order_by('-computed_score')
    return render(request, 'scoreboard/scoreboard.html', {'scores': scores})
