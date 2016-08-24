from allauth.socialaccount import providers
from allauth.socialaccount.providers.base import ProviderAccount
from allauth.socialaccount.providers.oauth2.provider import OAuth2Provider
from allauth.socialaccount.adapter import get_adapter


class DiscordAccount(ProviderAccount):
    pass


class DiscordProvider(OAuth2Provider):
    id = 'discord'
    name = 'Discord'
    account_class = DiscordAccount

    def extract_uid(self, data):
        print('\n\n\n*** THIS IS THE AVATAR DATA ***\n')
        print(data['avatar'])
        return data['id']

    def extract_common_fields(self, data):
        fields = {}
        fields['name'] = 'Fuck Is My Name'
        fields['avatar'] = 'https://discordapp.com/api/users/{}/avatars/{}.jpg'.format(data.get('id'), data.get('avatar'))
        print('these are the fields that will be used')
        print(fields)
        return fields

    def get_default_scope(self):
        scope = ['identify', 'email']
        return scope

providers.registry.register(DiscordProvider)