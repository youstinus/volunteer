@echo off
git add .
git commit -m 'HEROKU DEPLOYMENT'
git push heroku master
heroku open -a volunteer-ui