from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from redditalpha.polls.models import Poll, Choice, Answer


@require_http_methods(['GET'])
@login_required
def index(request):
    poll = Poll.objects.filter(closed=False).exclude(answers__user=request.user).order_by('created').first()

    if poll is not None:
        return JsonResponse({'poll': poll.as_dict()})
    else:
        return JsonResponse({})


@require_http_methods(['POST'])
@login_required
def vote(request, poll_id):
    poll = get_object_or_404(Poll, id=poll_id)
    
    choice_id = request.POST.get('choice', '0')
    choice = get_object_or_404(Choice, id=choice_id, poll=poll)

    if Answer.objects.filter(poll=poll, user=request.user).exists():
        # user already voted, so we won't save or update anything. fuck off
        print("You've already voted")
        return JsonResponse({})
    else:
        print("New vote cast!")
        Answer.objects.create(poll=poll, user=request.user, choice=choice)
        return JsonResponse({})
