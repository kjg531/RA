# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin

from .models import User
from .forms import UserCreationForm, UserChangeForm


class UserAdmin(AuthUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    fieldsets = (
        (None, {'fields': ('display_name', 'email', 'password')}),
        ('Permissions', {'fields': ('in_clan', 'is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    ordering = ('email',)

    list_display = ('display_name', 'email', 'in_clan', 'is_leader', 'avatar',)
    search_fields = ['display_name', 'email']

admin.site.register(User, UserAdmin)
