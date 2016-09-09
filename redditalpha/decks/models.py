from django.db import models


class Archetype(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()


class Deck(models.Model):
    # archetype = models.ForeignKey('Archetype', related_name='decks')
    cards = models.ManyToManyField('cards.Card', related_name='decks')
    creator = models.ForeignKey('users.User', related_name='created_decks')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'deck'
        verbose_name_plural = 'decks'

    def __eq__(self, other):
        if self.cards.count() != other.cards.count():
            return False

        for card in self.cards.all():
            if card not in other.cards.all():
                return False
        else:
            return True

    def is_equivalent_to(self, cards):
        if len(cards) != self.cards.count():
            return False

        for card in cards:
            if card not in self.cards.all():
                return False
        else:
            return True

    def __str__(self):
        return ', '.join(
            list(self.cards.values_list('name', flat=True))
        )

    def as_dict(self):
        return {
            'id': self.id,
            'cards': [c.as_dict() for c in self.cards.all()]
        }
