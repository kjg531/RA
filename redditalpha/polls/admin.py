from django.contrib import admin

from .models import *


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 0

class PollAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    fields = ('question', 'closed', 'created', 'creator')
    readonly_fields = ('created', 'creator')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.creator = request.user
        obj.save()


admin.site.register(Poll, PollAdmin)
admin.site.register(Answer)
