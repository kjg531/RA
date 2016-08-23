from django.db import models
from redditalpha.users.models import User

from redditalpha.cards.models import Card


class Archetype(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()


class Deck(models.Model):
    archetype = models.ForeignKey('Archetype', related_name='decks')
    cards = models.ManyToManyField(Card)
    popularity = models.IntegerField()
    current_favorite_of = models.ManyToManyField(User)
    cost_average = models.IntegerField()

    class Meta:
        verbose_name = "Clan"
        verbose_name_plural = "Clans"

    def __str__(self):
        return self.name

    def favorite_user_count(self):
        return self.current_favorite_of.count
