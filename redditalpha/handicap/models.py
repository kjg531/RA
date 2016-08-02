from django.db import models
from redditalpha.users.models import User


class Handicap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.BigIntegerField()

    class Meta:
        verbose_name = "Handicap"
        verbose_name_plural = "Handicaps"

    def __str__(self):
        return self.name + " " + self.score
