
echo "$HEROKU_AUTH_TOKEN" | docker login --username=_ registry.heroku.com --password-stdin

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t registry.heroku.com/volunteer-webapi/web ./server/WebAPI --no-cache

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

heroku container:release web -a volunteer-webapi