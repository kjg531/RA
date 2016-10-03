from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from adminsortable.models import SortableMixin
from adminsortable.fields import SortableForeignKey
from filer.fields.image import FilerImageField


class Series(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    participants = models.ManyToManyField('users.User', related_name='series', blank=True)

    def as_dict(self, user):
        return {
            'id': self.id,
            'name': self.name,
            'created': self.created.isoformat(),
            'participants': self.participants.filter(in_clan=True).count(),
            'participating': user in self.participants.filter(in_clan=True).all()
        }


class Tournament(models.Model):
    SIZE_CHOICES = (
        (50, '50 players'),
        (100, '100 players'),
        (200, '200 players'),
        (1000, '1000 players'),
    )

    name = models.CharField(max_length=100)
    series = models.ForeignKey('tournaments.Series', related_name='tournaments')
    start = models.DateTimeField()
    size = models.IntegerField(choices=SIZE_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('name',)

    def save(self, *args, **kwargs):
        super(Tournament, self).save(*args, **kwargs)

        for participant in self.series.participants.filter(in_clan=True):
            print('saving result for ')
            print(participant)
            result, created = self.results.get_or_create(user=participant, defaults={'cards_won': 0})
            print(result)
            print('created? {}'.format(created))

    def __str__(self):
        return self.name


class Screenshot(SortableMixin):
    tournament = SortableForeignKey('tournaments.Tournament')
    image = FilerImageField(related_name='screenshots')

    order = models.PositiveIntegerField(default=0, editable=False, db_index=True)

    class Meta:
        ordering = ('order',)


class Result(models.Model):
    tournament = models.ForeignKey('tournaments.Tournament', related_name='results')
    user = models.ForeignKey('users.User', help_text='Only clan members are allowed to earn tournament points')
    cards_won = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(15000)])

    class Meta:
        unique_together = ('tournament', 'user',)

    def subtotal_cards_won(self):
        return self.total_cards_won() - self.cards_won

    def total_cards_won(self):
        return self.user.cards_won_in_series(self.tournament.series)