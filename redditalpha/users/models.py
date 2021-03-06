# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import json
import hashlib

from django.core.urlresolvers import reverse
from django.db import models
from django.core.paginator import Paginator
from django.dispatch import receiver
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.conf import settings
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


from allauth.account.signals import user_signed_up, user_logged_in

from redditalpha.clans.models import Clan
from redditalpha.tournaments.models import Result


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    display_name = models.CharField(max_length=14, blank=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    in_clan = models.BooleanField(default=False)
    is_leader = models.BooleanField(default=False)
    avatar = models.URLField(blank=True)
    decks = models.ManyToManyField('decks.Deck', related_name='users', through='decks.DeckInclusion')
    hands = models.ManyToManyField('decks.Hand', related_name='users', through='decks.HandInclusion')
    favorite_decks = models.ManyToManyField('decks.Deck', related_name='fans')
    voted_decks = models.ManyToManyField('decks.Deck', related_name='voters', through='decks.Vote')

    is_staff = models.BooleanField(
        _('staff status'), default=False, help_text=_(
            'Designates whether the user can log into this admin site.'))
    is_active = models.BooleanField(_('active'), default=True, help_text=_(
        'Designates whether this user should be treated as '
        'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        ordering = ('display_name',)

    def get_full_name(self):
        return self.display_name

    def get_short_name(self):
        return self.display_name

    def __str__(self):
        return self.display_name

    def guess_display_name(self):
        return self.display_name.strip() or self.email

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'email': self.email})

    def natural_key(self):
        return self.email

    def avatar_url(self):
        return self.avatar or settings.DEFAULT_AVATAR_URL

    def auth_dict(self):
        return {
            'id': self.id,
            'display_name': self.guess_display_name(),
            'email': self.email,
            'is_leader': self.is_leader,
            'avatar': self.avatar_url(),
        }

    def as_dict(self):
        return {
            'id': self.id,
            'display_name': self.guess_display_name(),
            'email': self.email,
            'is_leader': self.is_leader,
            'avatar': self.avatar_url(),
        }

    def as_json(self):
        res = {
            'id': self.id,
            'display_name': self.display_name(),
            'email': self.email,
            'is_leader': self.is_leader,
            'avatar': self.avatar_url(),
        }

        return json.dumps(res)   

    def cards_won_in_series(self, series):
        return sum(list(Result.objects.filter(tournament__series=series, user=self).values_list('cards_won', flat=True))) or 0


@receiver(user_signed_up)
def set_initial_user_data(request, user, sociallogin=None, **kwargs):
    if sociallogin:
        # Our provider is always going to be discord (for now)        
        # Code slightly duplicated from our discord provider, because we don't know when the provider's
        # code is being used, and we need it here.
        user.email = sociallogin.account.extra_data['email']
        user.display_name = sociallogin.account.extra_data['username']

        if sociallogin.account.extra_data.get('avatar'):
            user.avatar = 'https://discordapp.com/api/users/{}/avatars/{}.jpg'.format(
                sociallogin.account.extra_data.get('id'), 
                sociallogin.account.extra_data.get('avatar')
            )
        else:
            user.avatar = ''

    user.guess_display_name()
    user.save()


@receiver(user_logged_in)
def update_user_avatar(request, user, sociallogin=None, **kwargs):
    # Will change only the avatar image obtained from discord
    
    if sociallogin:
        # Our provider is always going to be discord (for now)
        if sociallogin.account.extra_data.get('avatar'):
            user.avatar = 'https://discordapp.com/api/users/{}/avatars/{}.jpg'.format(
                sociallogin.account.extra_data.get('id'), 
                sociallogin.account.extra_data.get('avatar')
            )
        else:
            user.avatar = ''

    user.guess_display_name()
    user.save()
