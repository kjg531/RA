from django.conf.urls import url

from redditalpha.api.polls import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<poll_id>\d+)/vote$', views.vote, name='vote'),
]
