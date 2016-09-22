from django.conf.urls import url, include


urlpatterns = [
    url(r'^cards/', include('redditalpha.api.cards.urls', namespace='cards')),
    url(r'^decks/', include('redditalpha.api.decks.urls', namespace='decks')),
    url(r'^users/', include('redditalpha.api.users.urls', namespace='users')),
    url(r'^polls/', include('redditalpha.api.polls.urls', namespace='polls')),
    url(r'^tournaments/', include('redditalpha.api.tournaments.urls', namespace='tournaments')),
]
