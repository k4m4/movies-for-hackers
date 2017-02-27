@echo off
echo.
echo Pull from master - as it has the remote set by git remote add upstream https://github.com/k4m4/movies-for-hackers.git
echo.
git pull upstream master
git pull
git push
pause
