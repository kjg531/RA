from django.contrib import admin

from redditalpha.users.models import User

from .models import Series, Tournament, Result


class ResultInline(admin.TabularInline):
    model = Result
    extra = 1

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'user':
            kwargs['queryset'] = User.objects.filter(in_clan=True)
        return super(ResultInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class TournamentAdmin(admin.ModelAdmin):
    inlines = [ResultInline]

admin.site.register(Tournament, TournamentAdmin)
admin.site.register(Series)