import json
import itertools

from django.db import models

from channels import Group


class Archetype(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()


class Tag(models.Model):
    name = models.TextField(max_length=30)
    inclusion = models.ForeignKey('decks.DeckInclusion', related_name='tags')


class HandInclusion(models.Model):
    # THROUGH model for user_hand m2m
    user = models.ForeignKey('users.User', related_name='hand_inclusions')
    hand = models.ForeignKey('decks.Hand', related_name='hand_inclusions')
    starter = models.ForeignKey('cards.Card', related_name='hand_inclusions')


class DeckInclusion(models.Model):
    # THROUGH model for user_deck m2m
    user = models.ForeignKey('users.User', related_name='deck_inclusions')
    deck = models.ForeignKey('decks.Deck', related_name='deck_inclusions')
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'deck')


class Vote(models.Model):
    # THROUGH model for user_deck m2m
    VALUE_CHOICES = ((1, 'Up'), (-1, 'Down'))

    user = models.ForeignKey('users.User', related_name='votes')
    deck = models.ForeignKey('decks.Deck', related_name='votes')
    value = models.IntegerField(choices=VALUE_CHOICES) 

    class Meta:
        unique_together = (('user', 'deck'))


class Hand(models.Model):
    deck = models.ForeignKey('decks.Deck', related_name='hands')
    cards = models.ManyToManyField('cards.Card', related_name='hands')

    class Meta:
        verbose_name = 'hand'
        verbose_name_plural = 'hands'


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

    def tags(self, user):
        return list(Tag.objects.filter(
            inclusion__user=user,
            inclusion__deck=self
        ).values_list('name', flat=True))

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
                'tags': self.tags(user)
            })

        return res

    def socket_notify(self, action, user=None):
        assert action in ['add', 'update'], "You're using this function incorrectly!"
        data = self.as_dict(user=user)
        data['action'] = action
        Group('deckfeed').send({'text': json.dumps(data)})

    def possible_hands(self):
        return itertools.combinations(self.cards.all(), 4)

    def get_or_create_hand(self, card1_id, card2_id, card3_id, card4_id):
        for hand in self.hands.all():
            card_ids = hand.cards.values_list('id', flat=True)

            if card1_id not in card_ids:
                continue
            if card2_id not in card_ids:
                continue
            if card3_id not in card_ids:
                continue
            if card4_id not in card_ids:
                continue

            # if we got this far, then this hand is
            # the hand we are looking for, so return it

            return hand
        else:
            # at this point, we know that the hand we want doesn't,
            # so we create and return it

            new_hand = Hand.objects.create(deck=self)
            new_hand.cards.add(card1_id)
            new_hand.cards.add(card2_id)
            new_hand.cards.add(card3_id)
            new_hand.cards.add(card4_id)

            return new_hand

    def get_or_none_hand(self, card1_id, card2_id, card3_id, card4_id):
        for hand in self.hands.all():
            card_ids = hand.cards.values_list('id', flat=True)

            if card1_id not in card_ids:
                continue
            if card2_id not in card_ids:
                continue
            if card3_id not in card_ids:
                continue
            if card4_id not in card_ids:
                continue

            # if we got this far, then this hand is
            # the hand we are looking for, so return it

            return hand
        else:
            # at this point, we know that the hand we want doesn't,
            # so we return None

            return None 
