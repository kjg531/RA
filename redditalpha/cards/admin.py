from django.contrib import admin

from .models import Card, Balance
from .actions import sync_cards

class BalanceInline(admin.TabularInline):
    model = Balance
    extra = 0
    fields = ('date', 'description')
    readonly_fields = ('date',)


class CardAdmin(admin.ModelAdmin):
    actions = [sync_cards]
    fields = (
        'name',
        'description',
        'image',
        'cost',
        'rarity',
        'card_type'
    )

    # readonly_fields = ('name',)
    inlines = [BalanceInline]

admin.site.register(Card, CardAdmin)
