cd ionic-ui
npm install --save-dev  --unsafe-perm node-sass
npm install
ng lint
ng build
ng build --prod --base-href .
firebase deploy --token "$FIREBASE_TOKEN"