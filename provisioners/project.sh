echo "***** CREATING VIRTUAL ENV *****"

mkdir /home/vagrant/venv
virtualenv -p python3 /home/vagrant/venv

echo "***** INSTALLING PYTHON PACKAGES FROM requirements/local.txt *****"

source /home/vagrant/venv/bin/activate
pip3 install -r /home/vagrant/redditalpha/requirements/local.txt

echo "***** INSTALLING NODE PACKAGES FROM package.json *****"

cd /home/vagrant/redditalpha
npm install

echo "***** OK!!!!!! *****"
