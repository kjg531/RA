from django.contrib import admin
from django.db import models

from adminsortable.admin import NonSortableParentAdmin, SortableStackedInline

from redditalpha.users.models import User

from .models import Series, Tournament, Result, Screenshot


class ResultInline(admin.TabularInline):
    model = Result
    extra = 1
    fields = ('user', 'subtotal_cards_won', 'cards_won', 'total_cards_won')
    readonly_fields = ('subtotal_cards_won', 'total_cards_won',)
    # ordering = ('subtotal_cards_won',)

    # def subtotal_cards_won(self, obj):
    #     return self.total_cards_won(obj) - obj.cards_won
    # subtotal_cards_won.short_description = 'Cards Won (so far)'

    # def total_cards_won(self, obj):
    #     return obj.user.cards_won_in_series(obj.tournament.series)

    # def get_queryset(self, request):
    #     qs = super(ResultInline, self).get_queryset(request)
    #     qs.annotate(sub=Value())

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == 'user':
    #         kwargs['queryset'] = User.objects.filter(in_clan=True)
    #     return super(ResultInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class ScreenshotInline(SortableStackedInline):
    model = Screenshot
    extra = 0


class TournamentAdmin(NonSortableParentAdmin):
    inlines = [ScreenshotInline, ResultInline]


class SeriesAdmin(admin.ModelAdmin):
    filter_horizontal = ('participants',)


admin.site.register(Tournament, TournamentAdmin)
admin.site.register(Series, SeriesAdmin)
