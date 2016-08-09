from django.contrib import admin
from .models import Index


admin.site.register(Index)

admin.site.site_title = 'Reddit Alpha'
admin.site.site_header = 'Reddit Alpha'
