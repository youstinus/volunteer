
docker login --username=_ --password=$HEROKU_AUTH_TOKEN registry.heroku.com

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t registry.heroku.com/volunteer-webapi/web ./server/WebAPI --no-cache

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

echo "$DOCKER_USERNAME $DOCKER_PASSWORD" | heroku container:release web -a volunteer-webapi