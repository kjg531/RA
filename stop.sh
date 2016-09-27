echo "Killing workers:"
echo | pgrep -f runworker
pkill -f runworker

echo "Killing daphne:"
echo | pregp -f daphne
pkill -f daphne
