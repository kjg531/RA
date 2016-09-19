from django.conf.urls import url

from redditalpha.api.users import views


urlpatterns = [
    url(r'^me$', views.me, name='me'),
]
