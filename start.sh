export DJANGO_SETTINGS_MODULE=config.settings.production

echo "Starting 2 workers"
nohup ../ra_venv/bin/python manage.py runworker & 
nohup ../ra_venv/bin/python manage.py runworker & 
echo | pgrep -f runworker

echo "Starting daphne"

nohup ../ra_venv/bin/daphne -u /home/redditalpha/project/ra.sock config.asgi:channel_layer &
echo | pgrep -f daphne

echo "Done"