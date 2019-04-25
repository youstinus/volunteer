
docker login --username=_ --password=$HEROKU_AUTH_TOKEN registry.heroku.com

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t volunteer-webapi:$DOCKER_TAG ./server/WebAPI --no-cache

docker tag volunteer-webapi:$DOCKER_TAG registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG