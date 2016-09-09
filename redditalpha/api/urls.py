from django.conf.urls import url, include


urlpatterns = [
    url(r'^decks/', include('redditalpha.api.decks.urls', namespace='decks')),
]
