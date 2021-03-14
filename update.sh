#!/bin/bash

cd ~/wepo-server

echo "git pull"
git pull gitee master

echo "yarn install"
yarn

echo "build"
yarn build

echo "pm2 reload"
pm2 reload wepo-server