from django.db import models


class Clan(models.Model):
    name = models.CharField(max_length=100)
    score = models.BigIntegerField()

    class Meta:
        verbose_name = "clan"
        verbose_name_plural = "clans"

    def __str__(self):
        return self.name
