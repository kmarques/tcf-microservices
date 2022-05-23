#!/bin/bash

CHANGED=$(git diff --quiet HEAD master -- microservices | echo changed)
if [[ $CHANGED ]]; then
    docker-compose -f ./microservices/authentication/docker-compose.yml run authentication npm test -d --build
else
    echo 'No changes to authentication service'
fi