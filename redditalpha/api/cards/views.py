from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from redditalpha.cards.models import Card


@require_http_methods(['GET'])
@login_required
def index(request):
    if request.method == 'GET':
        return JsonResponse({
            'cards': [c.as_dict() for c in Card.objects.all()]
        })
