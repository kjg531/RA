echo "Killing workers:"
echo | pgrep -f runworker
pkill -f runworker

echo "Killing daphne:"
echo | pgrep -f daphne
pkill -f daphne
