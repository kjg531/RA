from django.conf.urls import url

from redditalpha.api.decks import views


urlpatterns = [
    url(r'^test$', views.test, name='test'), # yes, you can delete this
    url(r'^$', views.index, name='index'),
    url(r'^mine$', views.mine, name='mine'),
    url(r'^(?P<id>\d+)/delete$', views.delete, name='delete'),
    url(r'^(?P<id>\d+)/copy$', views.copy, name='copy'),
    url(r'^(?P<id>\d+)/favorite$', views.favorite, name='favorite'),
    url(r'^(?P<id>\d+)/upvote$', views.upvote, name='upvote'),
    url(r'^(?P<id>\d+)/downvote$', views.downvote, name='downvote'),
    url(r'^(?P<id>\d+)/notes$', views.notes, name='notes'),
    url(r'^(?P<id>\d+)/hand/starter$', views.hand_starter, name='hand_starter'),
    url(r'^(?P<id>\d+)/tags/add$', views.add_tag, name='add_tag'),
    url(r'^(?P<id>\d+)/tags/delete$', views.delete_tag, name='delete_tag'),
]
