# 取common_config中的配置参数
TCE_MIRROR_FILE_PATH=`awk '/TCE_MIRROR_FILE_PATH/ ' ./audit_config.js | sed 's/TCE_MIRROR_FILE_PATH: //' | sed 's/\,//g' | sed "s/'//g" | sed 's/\s//g' | sed 's/\t//g'`
RESOURCE_ONLINE_DIR="/opt/tiger/${TCE_MIRROR_FILE_PATH}"
RESOURCE_ONLINE_MACHINES='system.cdn.static'
echo "./output_resource"
