DOCKER_ENV=''
DOCKER_TAG=''

case "$TRAVIS_BRANCH" in
	"master")
		DOCKER_ENV=production
		DOCKER_TAG=latest
		;;
	"develop")
		DOCKER_ENV=development
		DOCKER_TAG=dev
		;;
esac

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -f volunteer-webapi:$DOCKER_TAG ./server/WebAPI --no-cache

docker tag volunteer-webapi:$DOCKER_TAG $DOCKER_USERNAME/volunteer-webapi:$DOCKER_TAG

docker push $DOCKER_USERNAME/volunteer-webapi:$DOCKER_TAG