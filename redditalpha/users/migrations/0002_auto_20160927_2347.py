# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-27 23:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='clan',
        ),
        migrations.AddField(
            model_name='user',
            name='in_clan',
            field=models.BooleanField(default=False),
        ),
    ]
