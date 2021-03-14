#!/bin/bash

cd ~/wepo-server

echo "> git pull gitee master"
git pull gitee master

echo "> yarn"
yarn

echo "> yarn build"
yarn build

echo "> pm2 reload wepo-server"
pm2 reload wepo-server