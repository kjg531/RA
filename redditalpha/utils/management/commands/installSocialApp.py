from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount import providers


class Command(BaseCommand):
    help = 'Create social apps for Discord'

    def handle(self, *args, **options):
        try:
            redditalpha_site = Site.objects.filter(name__iexact='redditalpha').first()
            provider = None

            for id, name in providers.registry.as_choices():
                if name.lower() == 'discord':
                    provider = id

            assert redditalpha_site is not None, "YOU NEED TO HAVE A SITE WITH THE NAME OF 'redditalpha'"

            if SocialApp.objects.filter(name='Discord').exists():
                self.stdout.write(self.style.SUCCESS("SocialApp for Discord already exists"))
            else:
                discord_app = SocialApp(
                    provider=provider,
                    name='Discord',
                    client_id='217852556863340544',
                    secret='Ckn3CucHno36b5yAPLQDva2URzAJIhll',
                    key=''
                )

                discord_app.save()
                discord_app.sites.add(redditalpha_site)
                self.stdout.write(self.style.SUCCESS("Created SocialApp for Discord"))
            self.stdout.write(self.style.SUCCESS("Finished successfully"))
        except Exception as ex:
            self.stdout.write(self.style.ERROR("Could not create SocialApp for Discord"))
            self.stdout.write(self.style.ERROR(str(ex)))
