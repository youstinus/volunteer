# Volunteering system

## Prepare server   
Setup MSSQL Express and SSMS   
Edit connection string in appsettings.json   
Restore NuGet Packages   
Build project   
Open NuGet Package Manager Console
Type `add-migration -name Initial` and `update-database`
Run project   
Open browser https://localhost:44300/swagger/   

## Prepare ionic-ui   
Open ionic-ui with VisualStudioCode or WebStorm     
`npm install`   
`npm install cordova -g`   
`npm install ionic -g`   
`ionic serve`   
Open browser localhost:8100/main
To build android:   
`ionic cordova add android`   
`ionic cordova build android`   
To release signed apk file type:   
`ionic cordova build android --prod --release`   

## Deploy server  
`cd ./server/WebAPI`  
`dotnet publish -c Release`  
`cd bin/release/netcoreapp2.1/publish`  
`docker build -t registry.heroku.com/<app-name>/web .`  
`heroku create`  
`heroku container:push web -a <app-name>`  
`heroku container:release web -a <app-name>`  