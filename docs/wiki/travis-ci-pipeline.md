### Using Travis-CI with projects

Travis.yml can be found inside root directory  
All scripts that build, test, deploy and perform other actions stored inside scripts directory   


### Base configurations
Define what branches to build:  

```
branches:   
  only:   
  - deploy   
  - /^v.*$/
```

Using branches only: deploy and git tags that match v letter and any symbols example: v1.0  

Defined main language:  
`language: node_js`  

Defined NodeJS version:  
`node_js:  
    - "10.9.0"`  

Defined `sudo: false`  

Define notifications:  
```
notifications:
  email:
    on_success: always
    on_failure: never
```

Defined matrix for building separately back-end, front-end for web, android and ios.  

### .NET Core WebAPI build pipeline

```
  - 
    language: csharp
    dist: trusty
    sudo: required
    mono: none
    dotnet: 2.1
    before_script:
    - chmod -R a+x scripts
    script:
    - "./scripts/dotnet-build.bat"
    - "./scripts/dotnet-test.bat"
    - "./scripts/dotnet-publish.bat"
    - "./scripts/docker-publish-travis.bat"
    - "./scripts/docker-publish-heroku.bat"
    - "./scripts/docker-publish-heroku-release.bat"
    after_success:
    - "./scripts/after-success.bat"
```
What scripts do:
- building solution
- testing
- building as publish/release binary
- building as Docker image
- publishing to heroku as container
- releasing container publicly

### Ionic Framework 4 website build pipeline

```
  -
    language: node_js
    dist: trusty
    node_js:
    - "10.9.0"
    addons:
      chrome: stable
    before_install:
    - chmod -R a+x scripts
    - "./scripts/ionic-prebuild.bat"
    before_script:
    - npm install -g @angular/cli
    - npm install -g firebase-tools
    script:
    - "./scripts/ionic-build.bat"
    - "./scripts/ionic-build-functions.bat"
    after_success:
    - "./scripts/ionic-publish-firebase.bat"
    
    deploy:
      provider: releases
      api_key:
        secure: <YOUR_ENCRYPTED_GITHUB_API_KEY>
      file:
      - "./ionic-ui/ionic-ui.tar.gz"
      skip_cleanup: true
      on:
        repo: youstinus/volunteer
        branch: deploy
        tags: true
```
What scripts do:
- define environment
- install angular and firebase
- build static website
- build firebase functions
- publishes to firebase
- adds static website to github as release zipped


### Ionic Framework 4 Android build pipeline

```
  -
    language: android
    os: linux
    jdk: oraclejdk8
    sudo: required
    node_js: false
    android:
      components:
      - tools
      - platform-tools
      - tools
      - build-tools-26.0.2
      - android-27
      - extra-google-google_play_services
      - extra-google-m2repository
      - extra-android-m2repository
    
    licenses:
    - android-sdk-preview-license-.+
    - android-sdk-license-.+
    - android-googletv-license-.+
    - google-gdk-license-.+
    - intel-android-extra-license-.+
    - mips-android-sysimage-license-.+
    
    before_install:
    - chmod -R a+x scripts
    - export LANG=en_US.UTF-8
    - nvm install v10.9.0
    - node --version
    - travis_retry curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    - travis_retry sudo apt-get update -qq
    - travis_retry sudo apt-get install -y -qq yarn
    install:
    - yarn
    before_script:
    - "./scripts/ionic-android-prebuild.bat"
    script:
    - "./scripts/ionic-android-build.bat"
    after_success:
    - "./scripts/ionic-android-publish.bat"
        
    deploy:
      provider: releases
      api_key:
        secure: <YOUR_ENCRYPTED_GITHUB_API_KEY>
      file:
      - "./ionic-ui/output/volunteer-release.apk"
      skip_cleanup: true
      on:
        repo: youstinus/volunteer
        branch: deploy
        tags: true
```
What scripts do:
- define environment
- accept lissences
- install dependencies
- builds android project with cordova
- signs apk with given key
- publish release on github as signed apk


### Ionic Framework 4 iOS build pipeline

```
  -
    language: objective-c
    os: osx
    osx_image: xcode9.4
    node_js: false
    before_install:
    - chmod -R a+x scripts
    - nvm install v10.9.0
    - node --version
    - travis_retry npm install -g yarn
    - yarn -version
    install:
    - travis_retry gem install xcpretty
    - travis_retry yarn
    before_script:
    - "./scripts/ionic-ios-prebuild.bat"
    script:
    - "./scripts/ionic-ios-build.bat"
    after_success:
    - "./scripts/ionic-ios-publish.bat"
    
    deploy:
      provider: releases
      api_key:
        secure: <YOUR_ENCRYPTED_GITHUB_API_KEY>
      file:    
      - "./ionic-ui/output/volunteer-release-unsigned.app.tgz"
      skip_cleanup: true
      on:
        repo: youstinus/volunteer
        branch: deploy
        tags: true
```

What scripts do:
- define environment
- installs dependencies
- build iOS application using cordova
- publish app zipped on github releases page

