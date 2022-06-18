#!/bin/bash

CHANGED=$(git diff --quiet HEAD master -- microservices | echo changed)
if [[ $CHANGED ]]; then
    docker-compose -f ./microservices/payment/docker-compose.yml run payment npm run test -d --build
else
    echo 'No changes to payment service'
fi