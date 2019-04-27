
cd ionic-ui
mkdir -p output

set -e
#cordova platform add android --nofetch

ionic cordova build android --verbose

cp platforms/android/app/build/outputs/apk/debug/app-debug.apk output/app.apk