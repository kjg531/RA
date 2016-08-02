from django.db import models
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError
from redditalpha.users.models import User

# Create your models here.


class Card(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Card"
        verbose_name_plural = "Cards"

    def __str__(self):
        return self.name


class Deck(models.Model):
    cards = models.ManyToManyField(Card)
    popularity = models.IntegerField()
    current_favorite_of = models.ManyToManyField(User)

    class Meta:
        verbose_name = "Clan"
        verbose_name_plural = "Clans"

    def __str__(self):
        return self.name

    def favorite_user_count(self):
        return self.current_favorite_of.count




# def deck_changed(sender, **kwargs):
#         if kwargs['instance'].cards.count() > 8:
#             raise ValidationError("You can't add more than 8 cards to a deck!")
#
# m2m_changed.connect(deck_changed(), sender=Deck.cards.through)
