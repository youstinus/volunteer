
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD registry.heroku.com

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t volunteer-webapi:$DOCKER_TAG ./server/WebAPI/bin/Docker --no-cache

docker tag volunteer-webapi:$DOCKER_TAG registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG