from django.db import models
from redditalpha.users.models import User


class Index(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.BigIntegerField()

    class Meta:
        verbose_name = "Index"
        verbose_name_plural = "Indices"

    def __str__(self):
        return self.name + " " + self.score
