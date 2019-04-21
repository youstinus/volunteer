@echo off
cd ../../server/WebAPI
dotnet publish -c Release
cd bin/release/netcoreapp2.1/publish
docker build -t registry.heroku.com/%1/web .
heroku container:push web -a %1
heroku container:release web -a %1