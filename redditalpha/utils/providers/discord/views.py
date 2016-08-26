import requests

from allauth.socialaccount.providers.oauth2.views import (OAuth2Adapter,
                                                          OAuth2LoginView,
                                                          OAuth2CallbackView)
from .provider import DiscordProvider


class DiscordAdapter(OAuth2Adapter):
    provider_id = DiscordProvider.id
    access_token_url = 'https://discordapp.com/api/oauth2/token'
    authorize_url = 'https://discordapp.com/api/oauth2/authorize'
    profile_url = 'https://discordapp.com/api/users/@me'
    basic_auth = True
    headers = {"User-Agent": "django-allauth-header"}

    # After successfully logging in, use access token to retrieve user info
    def complete_login(self, request, app, token, **kwargs):
        headers = {
            "Authorization": "Bearer " + token.token}
        headers.update(self.headers)
        extra_data = requests.get(self.profile_url, headers=headers)

        # This only here because of weird response from the test suite
        if isinstance(extra_data, list):
            extra_data = extra_data[0]

        return self.get_provider().sociallogin_from_response(
            request,
            extra_data.json()
        )


oauth2_login = OAuth2LoginView.adapter_view(DiscordAdapter)
oauth2_callback = OAuth2CallbackView.adapter_view(DiscordAdapter)