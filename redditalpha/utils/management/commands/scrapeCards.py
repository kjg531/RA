from django.core.management.base import BaseCommand
from redditalpha.cards.scraper import scrape_cards


class Command(BaseCommand):
    help = 'Scrape cards from the web'

    def handle(self, *args, **options):
        try:
            created, updated, untouched = scrape_cards()
            self.stdout.write(self.style.SUCCESS('%d created, %d updated, %d unchanged' % (created, updated, untouched)))
        except Exception as ex:
            self.stdout.write(self.style.ERROR("Whoops..."))
            self.stdout.write(self.style.ERROR(ex))
