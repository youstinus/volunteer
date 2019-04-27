
cd ionic-ui

set -e

mkdir -p output

tar zcvf ./platforms/ios/build/emulator/volun-release-unsigned.app.tgz ./platforms/ios/build/emulator/Volun.app

cp ./platforms/ios/build/emulator/volun-release-unsigned.app.tgz ./output/volun-release.app.tgz