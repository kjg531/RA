from django.db import models


class Clans(models.Model):
    name = models.CharField(max_length=100)
    clan_score = models.BigIntegerField()

    class Meta:
        verbose_name = "Clan"
        verbose_name_plural = "Clans"

    def __str__(self):
        return self.name
