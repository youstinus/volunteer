@echo off
cd ../../server/WebAPI
dotnet publish -c Release
cd bin/release/netcoreapp2.1/publish
docker build -t registry.heroku.com/volunteer-webapi/web .
heroku container:push web -a volunteer-webapi
heroku container:release web -a volunteer-webapi

cd ../../../../../../ionic-ui
ng build --prod --base-href .
firebase deploy