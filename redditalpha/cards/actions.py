import urllib
from PIL import Image
from io import StringIO

from django.core.files.base import ContentFile

import requests
from bs4 import BeautifulSoup

from .models import Card 

base_url = 'http://clashroyaledeckbuilder.com'


def download_image(name, image, url):
    input_file = StringIO(str(urllib.request.urlopen(url).read()))
    output_file = StringIO()
    img = Image.open(input_file)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(output_file, "JPEG")
    image.save(name+".jpg", ContentFile(output_file.getvalue()), save=False)


def scrape_general_data(card_tag):
    cardbg = card_tag.find(
        'div', {'class': 'cardTooltip'}
    ).find('div', {'class': 'cardBackground'})

    inner = cardbg.find('div', {'class': 'inner'})
    info = cardbg.find('div', {'class': 'info'})

    ####

    name = inner.find('div', {'class': 'name'}).string
    description = info.find('div', {'class': 'description'}).string
    cost = inner.find('div', {'class': 'cost'}).string

    try:
        cost = int(cost)
    except ValueError:
        cost = None

    vitals_spans = info.find('div', {'class': 'vitals'}).find_all('span')

    rarity = vitals_spans[0].string.lower()
    card_type = vitals_spans[1].string.lower()

    return (name, description, cost, rarity, card_type)


def get_card_image_url(card):
    cardbg = card.find(
        'div', {'class': 'cardTooltip'}
    ).find('div', {'class': 'cardBackground'})

    inner = cardbg.find('div', {'class': 'inner'})

    style = inner['style']
    parts = style.split(';')[0].split(' ')
    url_prop = parts[2].strip()[6:-2]

    return '%s/%s' % (base_url, url_prop)


def sync_cards(modeladmin, request, queryset):
    cards_url = '%s/cards' % (base_url)

    r = requests.get('http://clashroyaledeckbuilder.com/cards')
    soup = BeautifulSoup(r.text)
    card_tags = soup.select('div.card.base')
    
    cards_created = 0
    cards_updated = 0
    cards_untouched = 0

    for card_tag in card_tags: 
        name, description, cost, rarity, card_type = scrape_general_data(card_tag)

        card, created = Card.objects.get_or_create(
            name__iexact=name,
            defaults={
                'description': description,
                'cost': cost,
                'rarity': rarity,
                'card_type': card_type
            }
        )

        if created:
            cards_created += 1
        if not created:
            current_hash = '%s-%s-%s-%s' % (
                card.description,
                str(card.cost),
                card.rarity,
                card.card_type
            )

            new_hash = '%s-%s-%s-%s' % (
                description,
                str(cost),
                rarity,
                card_type
            )

            if (current_hash != new_hash):
                card.description = description
                card.cost = cost
                card.rarity = rarity
                card.card_type = card_type
                card.save()
                cards_updated += 1
            else:
                cards_untouched += 1

        # image_name = '%s.png' % card.name
        # image_url = get_card_image_url(card_tag)

        # download_image(image_name, card.image, image_url)

    print('Cards created: %d' % cards_created)
    print('Cards updated: %d' % cards_updated)
    print('Untouched cards: %d' % cards_untouched)

sync_cards.short_description = "Sync all cards"