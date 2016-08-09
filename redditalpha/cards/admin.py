from django.contrib import admin

from .models import Card 
from .actions import sync_cards


class CardAdmin(admin.ModelAdmin):
    actions = [sync_cards]


admin.site.register(Card, CardAdmin)
