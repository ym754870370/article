#!/bin/bash

DIR=`pwd`
OUTPUT="$DIR/output"
RESOURCE="$DIR/output_resource"

rm -rf $OUTPUT
rm -rf $RESOURCE
rm -rf node_modules
mkdir $OUTPUT
mkdir $RESOURCE

set -e  # 防止依赖安装失败还继续构建任务
source /etc/profile
nvm install 13
nvm use 13
node -v
npm set registry http://bnpm.byted.org/

rsync -av --exclude-from="$DIR/.scmignore" ./ "$OUTPUT"
(
  cd "$OUTPUT"
  npm install
  export NODE_ENV=production
  export NODE_SCM_ENV=cn
  npm run build
  export NODE_SCM_ENV=sg
  npm run build -f
)

cd $DIR
mkdir cn va gcp sg
mv $OUTPUT/output/audit $RESOURCE/