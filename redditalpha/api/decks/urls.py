from django.conf.urls import url

from redditalpha.api.decks import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
]
