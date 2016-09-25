import itertools

from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from redditalpha.cards.models import Card
from redditalpha.decks.models import Deck, Hand, Vote, DeckInclusion, HandInclusion, Tag
from redditalpha.decks.forms import DeckForm


def test(request):
    return HttpResponse('<h1>Tags</h1><p>{}</p>'.format(', '.join(request.POST.getlist('tags'))))


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
    me = request.user

    if request.method == 'GET':
        return JsonResponse({
            'decks': [d.as_dict(user=me) for d in me.decks.annotate(_vote_sum=Coalesce(Sum('votes__value'), 0)).order_by('-_vote_sum')],
            'tags': list(Tag.objects.filter(inclusion__user=me).values_list('name', flat=True).distinct())
        })
    elif request.method == 'POST':
        form = DeckForm(request.POST, user=me)

        if form.is_valid():
            # print('user has {} decks'.format(me.decks.count()))
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
                new_deck.creator = me
                new_deck.save()
                form.save_m2m() # this saves the cards/deck relationships

            inclusion = DeckInclusion.objects.create(
                user=me,
                deck=new_deck,
                notes=form.cleaned_data['notes']
            )

            for tag in request.POST.getlist('tags'):
                inclusion.tags.create(name=tag)
            # me.decks.add(new_deck)

            if brand_new:
                return JsonResponse({'status': 'ok! You crated a new deck!!!!'})
            else:
                return JsonResponse({'status': 'Deck added!'})
        else:
            return JsonResponse(form.errors, status=400)


@require_http_methods(['DELETE'])
@login_required
def delete(request, id):
    deck = get_object_or_404(Deck, id=id)
    try:
        DeckInclusion.objects.get(user=request.user, deck=deck).delete()
    except DeckInclusion.DoesNotExist:
        pass # meh
    return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def copy(request, id):
    deck = get_object_or_404(Deck, id=id)
    try:
        Inclusion.objects.create(user=request.user, deck=deck)
    except:
        pass # some sneaky bastards doing some shit
    return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def favorite(request, id):
    deck = get_object_or_404(Deck, id=id)

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
    value = None
    deck = get_object_or_404(Deck, id=id)

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
    value = None
    deck = get_object_or_404(Deck, id=id)

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


@require_http_methods(['GET', 'POST'])
@login_required
def notes(request, id):
    deck = get_object_or_404(Deck, id=id)

    if request.method == 'GET':
        data = dict()
        data['deck'] = deck.as_dict()
        data['deck']['hands'] = []

        for hand in deck.possible_hands():
            # hand is a list of card objects
            card_ids = [card.id for card in hand]

            # get hand from db, if it exists
            real_hand = deck.get_or_none_hand(*card_ids)
            
            # if the hand exists in db and it has been included by the user
            if real_hand is not None:
                # get inclusion of this hand from db, if it exists
                inclusion = HandInclusion.objects.filter(user=request.user, hand=real_hand).first()
                
                if inclusion is not None:
                    # we create the hand obj with the correct starter id (so it will show up as selected)
                    data['deck']['hands'].append({
                        'cards': card_ids,
                        'starter': inclusion.starter.id
                    })
                else:
                    # otherwise, we create the same obj, but leave the starter null
                    data['deck']['hands'].append({
                        'cards': card_ids,
                        'starter': None
                    })    
            else:
                # otherwise, we create the same obj, but leave the starter null
                data['deck']['hands'].append({
                    'cards': card_ids,
                    'starter': None
                })

        try:
            data['notes'] = DeckInclusion.objects.get(user=request.user, deck=deck).notes
        except DeckInclusion.DoesNotExist:
            data['notes'] = ''

        return JsonResponse(data)
    elif request.method == 'POST':
        inclusion, created = DeckInclusion.objects.get_or_create(user=request.user, deck=deck)
        inclusion.notes = request.POST.get('notes');              
        inclusion.save()
        return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def hand_starter(request, id):
    deck = get_object_or_404(Deck, id=id)
    card1_id = int(request.POST.get('card1_id', '0')) 
    card2_id = int(request.POST.get('card2_id', '0')) 
    card3_id = int(request.POST.get('card3_id', '0')) 
    card4_id = int(request.POST.get('card4_id', '0'))
    starter_id = request.POST.get('starter_id', '0')

    starter_card = get_object_or_404(Card, id=starter_id)

    hand = deck.get_or_create_hand(card1_id, card2_id, card3_id, card4_id)

    inclusion, created = HandInclusion.objects.get_or_create(user=request.user, hand=hand, defaults={'starter':starter_card})
    
    if not created:
        inclusion.starter = starter_card
        inclusion.save()
    
    return JsonResponse({})
