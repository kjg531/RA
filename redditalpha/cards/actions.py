from .scraper import scrape_cards

def sync_cards(modeladmin, request, queryset):
    created, updated, untouched = scrape_cards()
    modeladmin.message_user(request, '%d created, %d updated, %d unchanged' % (created, updated, untouched))
sync_cards.short_description = "Sync all cards"