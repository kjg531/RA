from django.conf.urls import url, include


urlpatterns = [
    url(r'^cards/', include('redditalpha.api.cards.urls', namespace='cards')),
    url(r'^decks/', include('redditalpha.api.decks.urls', namespace='decks')),
    url(r'^users/', include('redditalpha.api.users.urls', namespace='users')),
]
