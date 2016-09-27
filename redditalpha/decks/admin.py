from django.contrib import admin
from .models import Deck

class DeckAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'creator')

admin.site.register(Deck, DeckAdmin)
