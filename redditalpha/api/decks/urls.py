from django.conf.urls import url

from redditalpha.api.decks import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^mine$', views.mine, name='mine'),
    url(r'^(?P<id>\d+)/delete$', views.delete, name='delete'),
]
