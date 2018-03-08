#!/bin/sh
if [ ! -e "./.git/hooks/pre-commit" ]
then
    echo "Ignore tput errors: script still works!!"
    git secrets --install
    git secrets --register-aws
else
    echo "pre-commit file already exists"
fi