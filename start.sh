echo "Starting 2 workers"
nohup python manage.py runworker --settings=config.settings.production & 
nohup python manage.py runworker --settings=config.settings.production & 
echo | pgrep -f runworker


echo "Starting daphne"

nohup daphne -b 0.0.0.0 -p 21432 config.asgi:channel_layer
echo | pgrep -f daphne

echo "Done"