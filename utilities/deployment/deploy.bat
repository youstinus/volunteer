@echo off
git add .
git commit -m "HEROKU DEPLOY"
git push heroku master
heroku open -a volunteer-ui