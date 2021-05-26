export DEV=dev
sh ./scm_build.sh
set -e
PRE_BUILD=_pre_build
 
TARGET=zhangyanlei # 这个变量是用来发送到某个user
 
# 下面是项目的构建过程
PWD=$(pwd)
rm -rf $PRE_BUILD
mkdir $PRE_BUILD

rsync -av --progress output $PRE_BUILD --exclude output/node_modules
 
# 构建完毕
fat2 deploy $TARGET 
