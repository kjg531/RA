from django.db import models
from redditalpha.users.models import User


class Tournament(models.Model):
    name = models.CharField(max_length=100)
    schedule = models.DateTimeField()
    added = models.DateTimeField(auto_now_add=True)
    host = models.ForeignKey(User)
    size = models.IntegerField()
    result = models.ForeignKey

    class Meta:
        verbose_name = "Tournament"
        verbose_name_plural = "Tournaments"

    def __str__(self):
        return self.name
