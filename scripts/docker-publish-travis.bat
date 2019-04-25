SET DOCKER_ENV=production
SET DOCKER_TAG=latest

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -t volunteer-webapi:$DOCKER_TAG ./server/WebAPI/bin/Docker --no-cache

docker tag volunteer-webapi:$DOCKER_TAG $DOCKER_USERNAME/volunteer-webapi:$DOCKER_TAG

docker push $DOCKER_USERNAME/volunteer-webapi:$DOCKER_TAG