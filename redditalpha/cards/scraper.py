import json
import urllib
from io import BytesIO

from django.core.files.base import ContentFile
from django.utils.text import slugify

import requests
from PIL import Image
from urllib.parse import quote as url_quote
from dateutil.parser import parse as parse_date
from bs4 import BeautifulSoup

from .models import Card, Balance


base_url = 'http://clashroyaledeckbuilder.com'

def get_image_urls():
    print('Gathering image urls...')

    page_urls = [
        'http://clashroyale.wikia.com/index.php?action=ajax&articleId=Troop+Cards&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=1',
        'http://clashroyale.wikia.com/index.php?action=ajax&articleId=Troop+Cards&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=2',
        'http://clashroyale.wikia.com/index.php?action=ajax&articleId=Troop+Cards&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=3',
        'http://clashroyale.wikia.com/index.php?action=ajax&articleId=Spell+Cards&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=1',
        'http://clashroyale.wikia.com/index.php?action=ajax&articleId=Building+Cards&method=axGetArticlesPage&rs=CategoryExhibitionAjax&page=1'
    ]

    image_urls = dict()

    for i, page_url in enumerate(page_urls):
        r = requests.get(page_url)
        data = json.loads(r.text)
        soup = BeautifulSoup(data['page'])
        count = 0
        for item in soup.contents:
            if item.name == 'div':
                card_name = item.a.get('title')
                card_detail_url = item.a.get('href')
                card_detail_html = requests.get(card_detail_url).text
                card_detail_soup = BeautifulSoup(card_detail_html)

                card_image_url = card_detail_soup.find(
                    'div',
                    {'id': 'mw-content-text'}
                ).find(
                    'div',
                    {'class':'center'}
                ).div.img.get('src')

                image_urls[slugify(card_name)] = card_image_url
                count += 1
        print('Got {0} urls from page {1}...'.format(count, i + 1))

    return image_urls

def download_image(name, image, url):
    print('Downloading image for "{0}"...'.format(name, url))
    r = requests.get(url)
    output_file = BytesIO()
    img = Image.open(BytesIO(r.content))
    # if img.mode != "RGB":
    #     img = img.convert("RGB")
    img.save(output_file, "PNG")
    image.save(name + ".png", ContentFile(output_file.getvalue()), save=False)


# def get_card_image_url(card):
#     cardbg = card.find(
#         'div', {'class': 'cardTooltip'}
#     ).find('div', {'class': 'cardBackground'})

#     inner = cardbg.find('div', {'class': 'inner'})

#     style = inner['style']
#     parts = style.split(';')[0].split(' ')
#     url_prop = parts[2].strip()[6:-2]

#     return '%s/%s' % (base_url, url_prop)


def scrape_balance_data(card):
    card_detail_url = '%s/card/%s' % (base_url, url_quote(card.name))

    r = requests.get(card_detail_url)
    soup = BeautifulSoup(r.text)
    balance_table = soup.find('table')
    balances = []

    if balance_table is not None:
        for tr_tag in balance_table.find('tbody').find_all('tr'):
            date_str = tr_tag.find_all('td')[0].string
            date = parse_date(date_str.split('-')[0].strip())
            description = tr_tag.find_all('td')[1].string

            balances.append((date, description))

    return balances


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


def scrape_cards():
    image_urls = get_image_urls()
    cards_url = '%s/cards' % (base_url)

    r = requests.get(cards_url)
    soup = BeautifulSoup(r.text)
    card_tags = soup.select('div.card.base')
    
    cards_created = 0
    cards_updated = 0
    cards_untouched = 0

    for i, card_tag in enumerate(card_tags): 
        name, description, cost, rarity, card_type = scrape_general_data(card_tag)
        card, created = Card.objects.get_or_create(
            name__iexact=name,
            defaults={
                'name': name,
                'description': description,
                'cost': cost,
                'rarity': rarity,
                'card_type': card_type
            }
        )

        print('%d/%d Synchronizing "%s"...' % (i + 1, len(card_tags), card.name))

        download_image('{0}'.format(card.slug()), card.image, image_urls[card.slug()])

        if created:
            cards_created += 1
        if not created:
            current_hash = '%s-%s-%s-%s' % (card.description, str(card.cost), card.rarity, card.card_type)
            new_hash = '%s-%s-%s-%s' % (description, str(cost), rarity, card_type)

            if (current_hash != new_hash):
                card.description = description
                card.cost = cost
                card.rarity = rarity
                card.card_type = card_type
                cards_updated += 1
            else:
                cards_untouched += 1

        card.save()

        for date, description in scrape_balance_data(card):
            if not Balance.objects.filter(card=card, date=date, description=description).exists():
                Balance.objects.create(
                    card=card,
                    date=date,
                    description=description
                )
    return (cards_created, cards_updated, cards_untouched)
