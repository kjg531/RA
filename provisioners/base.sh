sudo apt-get update

echo "***** INSTALLING BASIC SHIT *****"

sudo apt-get --assume-yes install build-essential gettext


echo "***** INSTALLING PYTHON 3, PIP, VIRTUALENV *****"

sudo apt-get --assume-yes install python3 python3-dev python3-pip
pip3 install virtualenv


echo "***** INSTALLING POSTGRES *****"

sudo apt-get --assume-yes install postgresql postgresql-contrib libpq-dev
sudo -u postgres bash -c "psql -c \"CREATE USER vagrant WITH PASSWORD 'vagrant';\""
sudo -u postgres bash -c "psql -c \"CREATE DATABASE redditalpha;\""

echo "***** INSTALLING PILLOW DEPENDENCIES *****"

sudo apt-get --assume-yes install libtiff4-dev libjpeg8-dev libfreetype6-dev liblcms1-dev libwebp-dev zlib1g-dev

echo "***** INSTALLING NODE *****"

cd /home/ubuntu
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get --assume-yes install nodejs


echo "***** GOOD! *****"
