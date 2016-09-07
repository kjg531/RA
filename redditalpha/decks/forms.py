from django import forms

from .models import Deck


class DeckForm(forms.ModelForm):
    class Meta:
        model = Deck
        fields = ['cards']

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        super(DeckForm, self).__init__(*args, **kwargs)

    def clean_cards(self):
        cards = self.cleaned_data['cards']

        if len(cards) < 8:
            raise forms.ValidationError('You must have at least eight cards in a deck')
        elif len(cards) > 8:
            raise forms.ValidationError('You cannot have more than eight cards in a deck')

        for deck in self.user.decks.all():
            if deck.is_equivalent_to(cards):
                raise forms.ValidationError('You have already added this deck')

        return cards
