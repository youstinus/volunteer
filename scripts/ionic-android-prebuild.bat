
cd ionic-ui
nvm install 8
node --version
travis_retry curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
travis_retry sudo apt-get update -qq
travis_retry sudo apt-get install -y -qq yarn
yarn
npm install -g cordova ionic
npm install

#bower update
#npm install -g @angular/cli

#npm install -g ionic cordova

#npm i @ionic/angular-toolkit
