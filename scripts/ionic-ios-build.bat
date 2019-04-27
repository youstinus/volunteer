cd ionic-ui
mkdir -p output

set -e
#cordova platform add ios --nofetch

ionic cordova build ios --prod --release

#cp platforms/android/app/build/outputs/apk/release/app-release.apk output/release.apk
#cp platforms/ios/app/build/outputs/apk/release/app-release-unsigned.apk output/release-unsigned.apk