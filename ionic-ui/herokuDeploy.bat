@echo off
git add .
git commit -am "HEROKU DEPLOY"
git push heroku master
heroku open -a volunteer-ui