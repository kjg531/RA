# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url


from redditalpha.decks import views


urlpatterns = [
    url(r'^create$', views.create, name='create'),
]
