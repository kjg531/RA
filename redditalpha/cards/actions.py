import requests
from bs4 import BeautifulSoup

def sync_cards(modeladmin, request, queryset):
    r = requests.get('http://clashroyaledeckbuilder.com/cards')
    soup = BeautifulSoup(r.text)

    card_tags = soup.select('div.card.base')
    
    for card in card_tags:
        inner = card.find(
            'div', 
            {'class': 'cardTooltip'}
        ).find(
            'div', 
            {'class': 'cardBackground'}
        ).find(
            'div', 
            {'class': 'inner'}
        )

        name = inner.find(
            'div',
            {'class': 'name'}
        ).string

        cost = inner.find(
            'div',
            {'class': 'cost'}
        ).string

        print('%s (%s)' % (name, cost))

sync_cards.short_description = "Sync all cards"