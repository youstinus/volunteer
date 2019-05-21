#!/bin/bash

# Exit on first error, print all commands.
# set -ev

cd ionic-ui

# Grab the current directory.
# DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

npm install
#sudo npm install --unsafe-perm -g node-sass
npm install node-sass@4.10.0 --no-save
#for simple server. Change www/index.html
#ng build --prod --base-href .
ng build --prod --base-href /

tar -zcf ionic-ui.tar.gz ./www

mkdir -p output

# Does not work
cp ./ionic-ui.tar.gz ./output/volunteer-ui.tar.gz