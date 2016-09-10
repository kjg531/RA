import json
from django.db import models

from channels import Group


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

    def vote_sum(self):
        # this feels hacky
        # if _vote_sum is present, the sum of votes was calculated
        # from outside, by an annotate() call. So we use that if possible
        if hasattr(self, '_vote_sum'):
            return self._vote_sum
        else:
            return sum(list(self.votes.values_list('value', flat=True)))

    def vote_status(self, user):
        vote = self.votes.filter(user=user).first()
        return vote.value if vote is not None else 0

    def favorite_sum(self):
        return self.fans.count()

    def is_favorite(self, user):
        return user in self.fans.all()

    def as_dict(self, user=None):
        res = {
            'id': self.id,
            'cards': [c.as_dict() for c in self.cards.all()],
            'vote_sum': self.vote_sum(),
            'favorite_sum': self.favorite_sum()
        }

        if user is not None:
            res.update({
                'have_it': user in self.users.all(),
                'vote_status': self.vote_status(user),
                'favorite': self.is_favorite(user),
            })

        return res

    def socket_notify(self, action, user=None):
        assert action in ['add', 'update'], "You're using this function incorrectly!"
        data = self.as_dict(user=user)
        data['action'] = action
        Group('deckfeed').send({'text': json.dumps(data)})