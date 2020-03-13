#!/bin/bash

yarn install --production

echo 'Running migrations...'
yarn migrate up

exec "$@"
