# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver

from allauth.socialaccount.signals import pre_social_login

from redditalpha.clans.models import Clans

@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    clan = models.ForeignKey(Clans, on_delete=models.CASCADE, null=True)
    is_leader = models.BooleanField(default=False)
    avatar = models.URLField(blank=True)

    def __str__(self):
        return self.username

    def get_clan(self):
        return self.clan

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})



@receiver(pre_social_login)
def populate_profile(sender, **kwargs):
    print('signal receiver')
    acc = kwargs['sociallogin'].account
    usr = acc.user
    dat = acc.extra_data
    
    usr.name = dat.get('username');
    usr.avatar = 'https://discordapp.com/api/users/{}/avatars/{}.jpg'.format(dat.get('id'), dat.get('avatar'))
    usr.save()