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

heroku login -u $HEROKU_USERNAME -p $HEROKU_PASSWORD

docker build -f ./server/WebAPI/Dockerfile.$DOCKER_ENV -f volunteer-webapi:$DOCKER_TAG ./server/WebAPI --no-cache

docker tag volunteer-webapi:$DOCKER_TAG registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG

docker push registry.heroku.com/volunteer-webapi/web:$DOCKER_TAG