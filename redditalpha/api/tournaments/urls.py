from django.conf.urls import url

from redditalpha.api.tournaments import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^series/(?P<series_id>\d+)/register$', views.register, name='register'),
    url(r'^leaderboard$', views.leaderboard, name='leaderboard'),
]
