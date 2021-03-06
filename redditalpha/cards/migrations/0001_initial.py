# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-25 04:52
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('description', models.TextField()),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='cards')),
                ('cost', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('rarity', models.CharField(choices=[('common', 'Common'), ('rare', 'Rare'), ('epic', 'Epic'), ('legendary', 'Legendary')], max_length=30)),
                ('card_type', models.CharField(choices=[('troop', 'Troop'), ('building', 'Building'), ('spell', 'Spell')], max_length=30)),
            ],
            options={
                'verbose_name': 'card',
                'verbose_name_plural': 'cards',
                'ordering': ('name',),
            },
        ),
        migrations.AddField(
            model_name='balance',
            name='card',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cards.Card'),
        ),
    ]
