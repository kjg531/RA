from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from .choices import RARITY_CHOICES, CARD_TYPE_CHOICES


class Card(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    cost = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    rarity = models.CharField(max_length=30, choices=RARITY_CHOICES)
    card_type = models.CharField(max_length=30, choices=CARD_TYPE_CHOICES)

    class Meta:
        verbose_name = 'card'
        verbose_name_plural = 'cards'

    def __str__(self):
        return self.name


# class Balance(models.Model):
#     card = models.ForeignKey('Card')
#     date = models.DateField()
#     description = models.TextField()