#!/bin/bash
TCE_MIRROR_FILE_PATH=`awk '/TCE_MIRROR_FILE_PATH/ ' ./audit_config.js | sed 's/TCE_MIRROR_FILE_PATH: //' | sed 's/\,//g' | sed "s/'//g" | sed 's/\s//g' | sed 's/\t//g'`
cd /opt/tiger/${TCE_MIRROR_FILE_PATH}
source /etc/profile
nvm install 13
nvm use 13
node -v

pm2 start pm2.json --env production --no-daemon
