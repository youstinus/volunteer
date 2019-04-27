echo "ionic android buil successful. Ready to sign"

cd ionic-ui

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore -storepass $keystore_alias_password -keypass $keystore_password ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $keystore_alias

jarsigner -verify ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk

${ANDROID_HOME}/build-tools/26.0.2/zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./platforms/android/app/build/outputs/apk/release/volunteer-release.apk

