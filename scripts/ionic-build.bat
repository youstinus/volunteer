#!/bin/bash

# Exit on first error, print all commands.
# set -ev

cd ionic-ui

# Grab the current directory.
# DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

npm install
ng build --prod --base-href .