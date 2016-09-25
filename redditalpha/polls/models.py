from django.db import models


class Poll(models.Model):
    question = models.TextField()
    closed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey('users.User', related_name='created_polls')

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.question

    def results(self):
        res = []
        total_votes = Answer.objects.filter(poll=self).count()
        
        for choice in self.choices.all():
            id = choice.id
            text = choice.text
            votes = Answer.objects.filter(choice=choice, poll=self).count()

            if total_votes == 0:
                percentage = 0
            else:
                percentage = votes / total_votes * 100

            res.append({
                'id': id,
                'text': text,
                'votes': votes,
                'percentage': percentage
            })

        return res

    def as_dict(self, user):
        return {
            'id': self.id,
            'question': self.question,
            'closed': self.closed,
            'created': self.created.isoformat(),
            'creator': self.creator.display_name,
            'choices': [choice.as_dict() for choice in self.choices.all()],
            'taken': Answer.objects.filter(poll=self, user=user).exists(),
            'results': self.results()
        }


class Choice(models.Model):
    poll = models.ForeignKey('polls.Poll', related_name='choices')
    text = models.CharField(max_length=200)

    class Meta:
        ordering = ('')
        order_with_respect_to = 'poll'

    def __str__(self):
        return self.text

    def as_dict(self):
        return {
            'id': self.id,
            'text': self.text
        }


class Answer(models.Model):
    poll = models.ForeignKey('polls.Poll', related_name='answers')
    choice = models.ForeignKey('polls.Choice')
    user = models.ForeignKey('users.User', related_name='answers')

    def __str__(self):
        return '{0} {1} ({2})'.format(self.poll.question, self.choice.text, self.user.display_name)