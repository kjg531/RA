from django.db import models
from redditalpha.users.models import User

# Create your models here.


class Card(models.Model):
    name = models.CharField(max_length=50)
    cost = models.IntegerField()
    rarity = models.CharField(max_length=50)
    arena = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Card"
        verbose_name_plural = "Cards"

    def __str__(self):
        return self.name


class Deck(models.Model):
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
