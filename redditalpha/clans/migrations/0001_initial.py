# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-25 04:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('score', models.BigIntegerField()),
            ],
            options={
                'verbose_name': 'clan',
                'verbose_name_plural': 'clans',
            },
        ),
    ]
