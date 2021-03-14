#!/bin/bash
echo "git pull"
git pull gitee master

echo "yarn install"
yarn

echo "pm2 reload"
pm2 reload wepo-server