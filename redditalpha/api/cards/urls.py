from django.conf.urls import url

from redditalpha.api.cards import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
]
