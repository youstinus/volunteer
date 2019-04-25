cd ionic-ui
npm install
ng lint
ng build
ng build --prod --base-href .
firebase deploy --token "$FIREBASE_TOKEN"