<p>
    <img src="./ionic-ui/resources/icon.png" height="80" align="middle">Volunteering system</img>    
</p>

<p align="center">
    <a href="https://github.com/youstinus/volunteer/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/youstinus/volunteer.svg" /></a>
    <a href="https://github.com/youstinus/volunteer/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/w/youstinus/volunteer.svg" alt="GitHub commit activity"></a>
    <a href="https://travis-ci.org/youstinus/volunteer">
        <img src="https://img.shields.io/travis/youstinus/volunteer/v1.4.svg" alt="build status"></a>
    <a href="https://github.com/youstinus/volunteer/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/youstinus/volunteer.svg" alt="license"></a>
    <a href="https://github.com/youstinus/volunteer/releases">
        <img src="https://img.shields.io/github/downloads/youstinus/volunteer/total.svg" alt="GitHub All Releases"></a>
</p>

## Content
- [Technologies](#technologies)
- [Build .NET Core as Docker container](#run-webapi)
- [Build Ionic 4 Framework as Android, iOS or Web App](#use-ionic-4)
- [Use swagger with back-end services](#use-swagger)
- [Use and start MSSQL database with SSMS](#use-mssql-database)
- [Use Heroku registry to publish .NET Core as Docker container](#use-heroku)
- [How to use Docker](#use-docker)
- [Continous integration using Travis-CI](#continous-integration)

***
***

## Technologies
- .NET Core
- Entity Framework
- Swagger
- JWT
- Ionic 4 Framework
- Angular 7
- Heroku
- Travis-CI
- Firebase
- PostgreSQL

***
***

## Run WebAPI

Create Dockerfile from ./server/WebAPI/   
```
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY ./bin/Docker .
ENV ASPNETCORE_ENVIRONMENT docker
CMD ASPNETCORE_URLS=http://*:$PORT dotnet WebAPI.dll
```

Build and test .NET Core project from ./server/   
```
dotnet build
dotnet test
dotnet publish ./WebAPI -c Release -o ./bin/Docker
```

Create docker image from ./server/WebAPI/   
`docker build`  
Run docker image:  
`docker run -p 80:80 <IMAGE_TAG>`  

***
***

## Use Ionic 4

### Test
Unit tests:   
`ng test`   
or   
`npm run test`   
e2e tests:   
```
ionic serve
npm run e2e
```

### Build android
Add android platform and build apk:   
```
ionic cordova add android
ionic cordova build android --prod --release
```

Sign apk:   
Generate keystore   
`keytool -genkey -v -keystore key.keystore -alias alias -keyalg RSA -keysize 2048 -validity 10000`   
Sign   
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA256 -keystore key.keystore app-release-unsigned.apk alias -storepass pass`   
Pack APK   
`%LocalAppData%\Android\Sdk\build-tools\28.0.3\zipalign -v 4 app-release-unsigned.apk app-release-signed.apk`   
Verify APK   
`%LocalAppData%\Android\Sdk\build-tools\28.0.3\apksigner verify app-release-signed.apk`   

### Build iOS
Add iOS platform and build:   
```
ionic cordova add ios
ionic cordova build ios --prod --release
```

### Build web app to ./ionic-ui/www/
`ng build --prod --base-href .`   
For --base-href use `.` for Firebase and use `/` for uploading as static webpage   
Alternatively add browser and build using cordova    
`ionic cordova build browser --prod --release`   
To run localy   
`ionic serve`   

***
***

## Use Swagger

Create POST request to api/users/login`{"username":"test","password":"test"}`   
Returns `{"token":"<BEARER_TOKEN>"}`   
Copy `<BEARER_TOKEN>` value   
Press authenticate button at the top   
Paste token value like that: `Bearer <BEARER_TOKEN>`   
Use all api while authenticated   

***
***

## Use MSSQL database
### Prepare MSSQL server database   
Using Entity Framework with migrations from models   
Download and install MSSQL Express database (remember connections at the end of installation)   
Download SSMS (Microsoft SQL Server Management Studio)   
Connect to database using SSMS by providing server name   

### Prepare back-end service
Open appsettings.json and edit connection string to match your current database    
Or add ENVIRONMENTAL VARIABLE inside parameters   
Restore NuGet packages (context menu while right clicking on solution)   
Build solution   
Open NuGet package manager console (Tools -> NuGet package manager -> package manager console)   
If Migrations directory does not exist type (if exists, skip next command)   
`add-migration`   
Enter name, example: (Name: Initial)   
Update database using context and connection string   
`update-database`   
If there were no errors, check SSMS if new database was created.   
Run WebAPI projects with IIS Express   
Browser should open with swagger on url:   
`https://localhost:44300/swagger`   

***
***

## Use Heroku
Login    
Open CMD   
`heroku container:login`  
`heroku login`  
`docker login`  

Build and deploy server   
```
cd ./server/WebAPI
dotnet publish -c Release
cd bin/release/netcoreapp2.1/publish
docker build -t registry.heroku.com/<APP_NAME>/web .
heroku create
heroku container:push web -a <APP_NAME>
heroku container:release web -a <APP_NAME>
```

***
***

## Use docker   

Preparation:   
Install docker, docker-compose, configure docker-compose.yml and separate Dockerfile files
Build docker images with docker-compose:   
`docker-compose build`   
Or build image with extra parameter (see scripts directory):   
`docker build`   
Run docker containers   
`docker-compose up`   
Or run docker containers separately:   
`docker run <IMAGE_TAG>`   
Stop docker container with:   
`docker stop <IMAGE_TAG>`   
And start again docker image with:   
`docker start`   

Docker commands to maintain images and containers:   
Check running containers:   
`docker ps`   
Check all containers:   
`docker ps -a`   
Stop container:   
`docker stop <CONTAINER_TAG>`   
Start existing container:   
`docker start <CONTAINER_TAG>`   


***
***
***


## Continous integration

### Using Travis-CI with projects

Travis.yml can be found inside root directory  
All scripts that build, test, deploy and perform other actions stored inside scripts directory   

***

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

***

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

***

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

***

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

***

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

***

Platypus (c) 2019
