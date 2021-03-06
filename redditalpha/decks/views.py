from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from .models import Deck
from .forms import DeckForm


@require_http_methods(['GET', 'POST'])
@login_required
def index(request):
    if request.method == 'GET':
        return JsonResponse({
            'decks': [d.as_dict() for d in Deck.objects.all()]
        })
    elif request.method == 'POST':
        form = DeckForm(request.POST, user=request.user)

        if form.is_valid():
            # print('user has {} decks'.format(request.user.decks.count()))
            cards = form.cleaned_data['cards']
            brand_new = False

            for deck in Deck.objects.all():
                if deck.is_equivalent_to(cards):
                    # that deck already existed. we don't need to create it
                    new_deck = deck
                    break
            else:
                # if it got this far, we know that this is a new deck
                # save it, and add the creator/created dates
                brand_new = True
                new_deck = form.save(commit=False)
                new_deck.creator = request.user
                new_deck.save()
                form.save_m2m()

            request.user.decks.add(new_deck)

            if brand_new:
                return JsonResponse({'status': 'ok! You crated a new deck!!!!'})
            else:
                return JsonResponse({'status': 'Deck added!'})
        else:
            return JsonResponse(form.errors, status=400)
