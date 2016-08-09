from django.contrib import admin

from .models import Card 
from .actions import sync_cards


class CardAdmin(admin.ModelAdmin):
    actions = [sync_cards]
    fields = (
        'name',
        'description',
        'cost',
        'rarity',
        'card_type'
    )

    readonly_fields = ('name',)


admin.site.register(Card, CardAdmin)
