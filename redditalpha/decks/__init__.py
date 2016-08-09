# from django.db.models.signals import m2m_changed
# from django.core.exceptions import ValidationError
#
# from redditalpha.decks.models import *
#
#
# def deck_changed(sender, **kwargs):
#     if kwargs['instance'].cards.count() > 8:
#         raise ValidationError("You can't add more than 8 cards to a deck!")
#
#
# m2m_changed.connect(deck_changed(), sender=Deck.cards.through)
