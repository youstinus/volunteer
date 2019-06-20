### Content
- [Technologies](#technologies)
- [Build .NET Core as Docker container](#run-webapi)
- [Build Ionic 4 Framework as Android, iOS or Web App](#use-ionic-4)
- [Use swagger with back-end services](#use-swagger)
- [Use and start MSSQL database with SSMS](#use-mssql-database)
- [Use Heroku registry to publish .NET Core as Docker container](#use-heroku)
- [How to use Docker](#use-docker)

***
***

### Technologies
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

### Run WebAPI

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

### Use Ionic 4

#### Test
Unit tests:   
`ng test`   
or   
`npm run test`   
e2e tests:   
```
ionic serve
npm run e2e
```

#### Build android
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


#### Build iOS
Add iOS platform and build:   
```
ionic cordova add ios
ionic cordova build ios --prod --release
```

#### Build web app to ./ionic-ui/www/
`ng build --prod --base-href .`   
For --base-href use `.` for Firebase and use `/` for uploading as static webpage   
Alternatively add browser and build using cordova    
`ionic cordova build browser --prod --release`   
To run localy   
`ionic serve`   


***
***

### Use Swagger

Create POST request to api/users/login`{"username":"test","password":"test"}`   
Returns `{"token":"<BEARER_TOKEN>"}`   
Copy `<BEARER_TOKEN>` value   
Press authenticate button at the top   
Paste token value like that: `Bearer <BEARER_TOKEN>`   
Use all api while authenticated   

***
***

### Use MSSQL database
#### Prepare MSSQL server database   
Using Entity Framework with migrations from models   
Download and install MSSQL Express database (remember connections at the end of installation)   
Download SSMS (Microsoft SQL Server Management Studio)   
Connect to database using SSMS by providing server name   

#### Prepare back-end service
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

### Use Heroku
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

### Use docker   

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

Platypus (c) 2019