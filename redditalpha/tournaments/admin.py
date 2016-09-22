from django.contrib import admin
from .models import Series, Tournament, Result
# Register your models here.

class ResultInline(admin.TabularInline):
    model = Result
    extra = 1


class TournamentAdmin(admin.ModelAdmin):
    inlines = [ResultInline]

admin.site.register(Tournament, TournamentAdmin)
admin.site.register(Series)