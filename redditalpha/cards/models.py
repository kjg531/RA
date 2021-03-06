from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from .choices import RARITY_CHOICES, CARD_TYPE_CHOICES


class Card(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to='cards')
    cost = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], blank=True, null=True)
    rarity = models.CharField(max_length=30, choices=RARITY_CHOICES)
    card_type = models.CharField(max_length=30, choices=CARD_TYPE_CHOICES)

    class Meta:
        ordering = ('name',)
        verbose_name = 'card'
        verbose_name_plural = 'cards'

    def slug(self):
        return slugify(self.name)

    def base_image_filename(self):
        return '%s.png' % slugify(self.name).replace('-', '')

    def base_image_url(self):
        return '/static/images/cards/%s' % self.base_image_filename()

    def __str__(self):
        return self.name

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug(),
            'description': self.description,
            'image_url': self.image.url,
            'cost': self.cost,
            'rarity': self.get_rarity_display(),
            'card_type': self.get_card_type_display()
        }


class Balance(models.Model):
    card = models.ForeignKey('Card')
    date = models.DateField()
    description = models.TextField()

    class Meta:
        ordering = ('-date',)

    def __str__(self):
        return '%s - %s' % (self.date, self.description[:20])


# class LevelStats(models.Model):
#     card = models.ForeignKey(Card, related_name='levels')
#     number = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(13)])
#     