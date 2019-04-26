    # install build dependecies
cd ionic-ui
npm install -g cordova ionic

    # - install plugins etc.
cordova prepare

    # build Android and iOS packages
ionic cordova build android --release
ionic cordova build ios --device --release