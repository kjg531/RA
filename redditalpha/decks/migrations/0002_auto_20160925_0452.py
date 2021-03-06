# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-25 04:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cards', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('decks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tag',
            name='inclusion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='decks.DeckInclusion'),
        ),
        migrations.AddField(
            model_name='handinclusion',
            name='hand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hand_inclusions', to='decks.Hand'),
        ),
        migrations.AddField(
            model_name='handinclusion',
            name='starter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hand_inclusions', to='cards.Card'),
        ),
        migrations.AddField(
            model_name='handinclusion',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hand_inclusions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='hand',
            name='cards',
            field=models.ManyToManyField(related_name='hands', to='cards.Card'),
        ),
        migrations.AddField(
            model_name='hand',
            name='deck',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hands', to='decks.Deck'),
        ),
        migrations.AddField(
            model_name='deckinclusion',
            name='deck',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deck_inclusions', to='decks.Deck'),
        ),
        migrations.AddField(
            model_name='deckinclusion',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deck_inclusions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='deck',
            name='cards',
            field=models.ManyToManyField(related_name='decks', to='cards.Card'),
        ),
        migrations.AddField(
            model_name='deck',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_decks', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together=set([('user', 'deck')]),
        ),
        migrations.AlterUniqueTogether(
            name='deckinclusion',
            unique_together=set([('user', 'deck')]),
        ),
    ]
