echo "ionic android buil successful. Ready to sign"

cd ionic-ui

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore -storepass $keystore_alias_password -keypass $keystore_password ./output/release-unsigned.apk $keystore_alias

jarsigner -verify ./output/release-unsigned.apk

${ANDROID_HOME}/build-tools/26.0.2/zipalign -v 4 ./output/release-unsigned.apk ./output/volunteer-release.apk

