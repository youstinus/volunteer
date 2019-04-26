cd ionic-ui
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter platform-tools
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter build-tools-23.0.2
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter android-23
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter extra-android-support
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter extra-android-m2repository
echo y | ./android-sdk-macosx/tools/android update sdk --no-ui --all --filter extra-google-m2repository
