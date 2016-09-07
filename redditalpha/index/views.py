from django.shortcuts import render

from redditalpha.cards.models import Card


def home(request, *args, **kwargs):
    context = {'cards': Card.objects.all()}
    return render(request, 'index.html', context)
