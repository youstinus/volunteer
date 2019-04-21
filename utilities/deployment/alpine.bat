@echo off
cd ../../server/WebAPI && docker build . -t registry.heroku.com/%1/web && heroku container:push web -a %1 && heroku container:release web -a %1 && cd ../../utilities/deployment