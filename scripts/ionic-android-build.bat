
cd ionic-ui
#mkdir -p output

set -e
#cordova platform add android --nofetch

ionic cordova build android --prod --release

#cp platforms/android/app/build/outputs/apk/release/app-release.apk output/release.apk
#cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk output/release-unsigned.apk