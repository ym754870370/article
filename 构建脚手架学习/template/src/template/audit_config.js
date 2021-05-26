const path = require('path');

const getUrl = req => {
    return req.originalUrl.replace(/(\/)?\?.*/, '');
};

// TODO: 对 audit_cli_test 进行替换 

const publicPathMap = {
    'va': '//sf16-scmcdn-va.ibytedtos.com/goofy/ad/audit_cli_test/',
    'sg': '//sf16-scmcdn-sg.ibytedtos.com/goofy/ad/audit_cli_test/',
    'cn': '//sf3-scmcdn-tos.pstatp.com/goofy/ad/audit_cli_test/',
}

module.exports = {
    
    // 根据TCE基础配置 中镜像配置的 SCM部署路径进行修改 自动更新 scm_build_resource.sh \ bootstrap.sh
    TCE_MIRROR_FILE_PATH: '/static/bytecom/resource',
    
    // P.S.M 自动更新配置文件settings.py  配置不生效 仍需手动修改settings.py
    PRODUCT: 'ad',
    SUBSYS: 'audit',
    MODULE: 'audit_cli_test',
    APP_TYPE: 'binary',
    
    // Slardar bid 自动更新的 index.html中
    SLARDAR_BID: 'ad_audit_fe_common',

    // config/index 文件配置
    BASE_URL: '/audit',
    BASE_ORIGIN_URL: '://ad.bytedance.net',


    // webpack配置
    config: {
        useEslint: true,
        buildAssetsPublicPath: publicPathMap[process.env.NODE_SCM_ENV],
    },

    // 入口
    entry: {
        app: {
            filename: 'views/app.html',
            template: '/src/template/index_normal.html',
            chunkName: 'app',
            jsTplPath: '/src/router/js_tpl/app.js',
            isUseRem: false
        }, 
        audit: {
            filename: 'views/audit.html',
            template: '/src/template/index_normal.html',
            chunkName: 'audit',
            jsTplPath: '/src/router/js_tpl/audit.js',
            isUseRem: false,
        },
        crm: {
            filename: 'views/crm.html',
            template: '/src/template/index_normal.html',
            chunkName: 'crm',
            jsTplPath: '/src/router/js_tpl/crm.js',
            isUseRem: false
        }
    },

   // webpack 基础配置
    base: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                ASSETS: path.resolve('./src/assets'),
                IO: path.resolve('./src/io'),
                LIB: path.resolve('./src/lib'),
                PAGE: path.resolve('./src/page'),
                PAGELET: path.resolve('./src/pagelet'),
                ROUTER: path.resolve('./src/router'),
                STORE: path.resolve('./src/store'),
                TEMPLATE: path.resolve('./src/template'),
                UI: path.resolve('./src/ui'),
                '@': path.resolve('./src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [path.resolve('./src'), path.resolve('./test'), path.resolve(__dirname, '../../../node_modules/webpack-dev-server/client')],
                },
            ],
        },
    },

    // webpack -dev 配置 merge
    dev: {
        devServer: {
            proxy: {
                '*': {
                    bypass: function(req, res, proxyOptions) {
                        const url = getUrl(req);
                        const app = /\/app/.test(url) && !/\.html$/.test(url);
                        const audit = /\/audit/.test(url) && !/\.html$/.test(url);
                        const crm = /\/crm/.test(url) && !/\.html$/.test(url);
                        if (app) {
                            return '/views/app.html';
                        } else if (audit) {
                            return '/views/audit.html';
                        } else if (crm) {
                            return '/views/crm.html';
                        } else {
                            return '/views/app.html';
                        }
                    },
                },
            },
        }
    },

    // webpack -prod 配置 merge
    build: {
    },
    
};
