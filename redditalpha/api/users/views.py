from django.http import JsonResponse


def me(request):
    if request.user.is_authenticated():
        return JsonResponse(request.user.auth_dict(), status=200) # OK, you are logged in
    else:
        return JsonResponse({}, status=401) # UNAUTHORIZED, log your shit in pls
