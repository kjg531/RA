from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from redditalpha.users.models import Vote
from redditalpha.decks.models import Deck
from redditalpha.decks.forms import DeckForm


@require_http_methods(['GET'])
@login_required
def index(request):
    if request.method == 'GET':
        return JsonResponse({
            'decks': [d.as_dict(user=request.user) for d in Deck.objects.annotate(_vote_sum=Coalesce(Sum('votes__value'), 0)).order_by('-_vote_sum')]
        })


@require_http_methods(['GET', 'POST'])
@login_required
def mine(request):
    if request.method == 'GET':
        return JsonResponse({
            'decks': [d.as_dict(user=request.user) for d in request.user.decks.all()]
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


@require_http_methods(['DELETE'])
@login_required
def delete(request, id):
    deck = Deck.objects.filter(id=id).first()
    if deck is not None:
        request.user.decks.remove(deck)

    return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def copy(request, id):
    deck = Deck.objects.filter(id=id).first()
    if deck is not None:
        request.user.decks.add(deck)

    return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def favorite(request, id):
    deck = Deck.objects.filter(id=id).first()
    if deck is not None:
        if deck in request.user.favorite_decks.all():
            request.user.favorite_decks.remove(deck)
            result = False
        else:
            request.user.favorite_decks.add(deck)
            result = True

        deck.socket_notify('update', user=request.user)
        return JsonResponse({'favorite': result})


@require_http_methods(['POST'])
@login_required
def upvote(request, id):
    deck = Deck.objects.filter(id=id).first()
    value = None

    if deck is not None:
        # CAREFUL HERE PLEASE
        vote, created = Vote.objects.get_or_create(deck=deck, user=request.user, defaults={'value': 1})

        if created:
            # if it's a newly created vote, set it to 1 (because this is an upvote)
            value = 1
        elif vote.value == 1: # if the vote was 1, un-upvote. so, delete the row
            vote.delete()
            value = 0
        elif vote.value == -1: # if the vote was a downvote, make it an upvote
            vote.value = 1
            vote.save()
            value = 1

        deck.socket_notify('update', user=request.user)
        return JsonResponse({'value': value})


@require_http_methods(['POST'])
@login_required
def downvote(request, id):
    deck = Deck.objects.filter(id=id).first()
    value = None

    if deck is not None:
        # CAREFUL HERE PLEASE
        vote, created = Vote.objects.get_or_create(deck=deck, user=request.user, defaults={'value': -1})

        if created:
            # if it's a newly created vote, set it to -1 (because this is a downvote)
            value = -1
        elif vote.value == -1: # if the vote was -1, un-downvote. so, delete the row
            vote.delete()
            value = 0
        elif vote.value == 1: # if the vote was an upvote, make it a downvote
            vote.value = -1
            vote.save()
            value = -1

        deck.socket_notify('update', user=request.user)
        return JsonResponse({'value': value})
