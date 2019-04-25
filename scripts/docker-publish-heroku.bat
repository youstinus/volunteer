SET DOCKER_ENV=production
SET DOCKER_TAG=latest

heroku login -i $HEROKU_USERNAME $HEROKU_PASSWORD

heroku container:login -u $HEROKU_USERNAME -p $HEROKU_PASSWORD

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t volunteer-webapi:$DOCKER_TAG ./server/WebAPI/bin/Docker --no-cache

docker tag volunteer-webapi:$DOCKER_TAG registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG