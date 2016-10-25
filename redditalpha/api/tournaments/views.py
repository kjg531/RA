from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from redditalpha.tournaments.models import Series, Tournament, Result


@require_http_methods(['GET'])
@login_required
def index(request):
    series = Series.objects.last()
    
    if series is not None:
        return JsonResponse({'series': series.as_dict(user=request.user)})
    else:
        return JsonResponse({'series': None})


@require_http_methods(['POST'])
@login_required
def register(request, series_id):
    series = get_object_or_404(Series, id=series_id)
    series.participants.add(request.user)
    return JsonResponse({'series': series.as_dict(user=request.user)})


@require_http_methods(['GET'])
@login_required
def leaderboard(request):
    series = Series.objects.last()
    scores = []

    for user in series.participants.filter(in_clan=True).all():
        cards_won = Result.objects.filter(
            user=user,
            tournament__series=series
        ).aggregate(cards_won=Coalesce(Sum('cards_won'), 0))['cards_won']
        
        if cards_won > 0:
            scores.append({
                'user': user.as_dict(),
                'cards_won': cards_won
            })

    scores.sort(reverse=True, key=lambda s: s['cards_won'])
    return JsonResponse({
        'series': series.as_dict(user=request.user),
        'leaderboard': scores
    })
