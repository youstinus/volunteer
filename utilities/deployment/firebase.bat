@echo off
cd ../../ionic-ui
ng build --prod --base-href .
firebase deploy