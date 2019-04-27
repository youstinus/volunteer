
cd ionic-ui
mkdir -p output
yarn install

set -e
cordova platform add android --nofetch

ionic cordova build android

cp platforms/android/app/build/outputs/apk/debug/app-debug.apk output/app.apk