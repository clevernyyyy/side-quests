# from django.http import HttpResponse
from django.shortcuts import render
from scoreboard.models import Score

def homepage(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def scoreboard(request):
    scores = Score.objects.all().order_by('-computed_score', 'terminating_score')
    return render(request, 'scoreboard.html', {'scores': scores})