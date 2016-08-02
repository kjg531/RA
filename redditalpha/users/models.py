# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from redditalpha.clans.models import Clans

@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    clan = models.ForeignKey(Clans, on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)

    # These apps have foriegn keys to User so these are not necessary?!?!?
    reputation = models.BigIntegerField(default=0)
    index = models.BigIntegerField(default=0)
    handicap = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return self.username

    def get_clan(self):
        return self.clan

    def get_reputation(self):
        return self.reputation

    def get_index(self):
        return self.index

    def get_handicap(self):
        return self.handicap

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})
