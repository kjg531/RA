from django.conf.urls import url

from redditalpha.api.decks import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^mine$', views.mine, name='mine'),
    url(r'^(?P<id>\d+)/delete$', views.delete, name='delete'),
    url(r'^(?P<id>\d+)/copy$', views.copy, name='copy'),
    url(r'^(?P<id>\d+)/favorite$', views.favorite, name='favorite'),
    url(r'^(?P<id>\d+)/upvote$', views.upvote, name='upvote'),
    url(r'^(?P<id>\d+)/downvote$', views.downvote, name='downvote'),
]
