from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Series(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    participants = models.ManyToManyField('users.User', related_name='series', blank=True)

    def as_dict(self, user):
        return {
            'id': self.id,
            'name': self.name,
            'created': self.created.isoformat(),
            'participants': self.participants.count(),
            'participating': user in self.participants.all()
        }


class Tournament(models.Model):
    SIZE_CHOICES = (
        (100, '100 players'),
        (150, '150 players'),
        (200, '200 players'),
        (250, '250 players'),
        (300, '300 players'),
        (500, '500 playesr'),
        (600, '600 players'),
        (800, '800 players'),
        (1000, '1000 players')
    )

    LENGTH_CHOICES = (
        (1, '1h'),
        (2, '2h'),
        (3, '3h'),
        (4, '4h'),
        (8, '8h'),
        (24, '1d'),
        (48, '2d'),
        (72, '3d'),
    )

    name = models.CharField(max_length=100)
    series = models.ForeignKey('tournaments.Series', related_name='tournaments')
    start = models.DateTimeField()
    length = models.IntegerField(choices=LENGTH_CHOICES)
    size = models.IntegerField(choices=SIZE_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Result(models.Model):
    tournament = models.ForeignKey('tournaments.Tournament', related_name='results')
    user = models.ForeignKey('users.User', help_text='Only clan members are allowed to earn tournament points')
    cards_won = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(15000)])

    class Meta:
        unique_together = ('tournament', 'user',)
