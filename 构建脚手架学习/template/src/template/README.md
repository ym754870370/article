# audit-crm-fe-template

本仓库为展现优化-审核通用的前端仓库模版脚手架。
项目初始化方法：clone当前仓库，然后在新项目中执行指令
`rsync -av --exclude='/.git' --exclude='/node_modules' ../audit-crm-template/ ./`(注意source与target，默认假设平级，非平级自行替换)

## 1. 技术选型

本脚手架主要基于Vue的技术选型.

* vue
* vuex
* vue-router
* webpack
* ES6
* Stylus(css样式语言)
* Pug (vue 模版语法)
* Axios

# 2. 模块构成

脚手架的基本组成分成三个部分介绍，webpack+多页的配置、src目录设计、上线相关。

```
├── README.md
├── app.js
├── bin 
│   └── www
├── bootstrap.sh
├── build # webpack 配置
│   ├── build.js
│   ├── check-versions.js
│   ├── config
│   │   └── entry.json
│   ├── dll
│   │   ├── vendor-manifest.json
│   │   └── vendor.dll.js
│   ├── entry.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.dll.conf.js
│   └── webpack.prod.conf.js
├── config # dev/prod 配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── fat-config.js
├── online_log
├── pack_web.sh
├── package-lock.json
├── package.json
├── pm2.json
├── scm_build.sh
├── scm_build_resource.sh
├── scripts
│   ├── yarn-0.24.6.js
│   └── yarn-1.3.2.js
├── settings.py
├── src  # 源代码配置
│   ├── assets
│   │   └── loading-small.gif
│   ├── io
│   │   ├── account.js
│   │   ├── axios_intercption.js
│   │   ├── common.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── other.js
│   │   └── sdk_login.js
│   ├── lib
│   │   ├── dom
│   │   │   └── rect.js
│   │   └── utils
│   │       └── fail_api.js
│   ├── page
│   │   ├── api-request.vue
│   │   ├── crm-test.vue
│   │   ├── home.vue
│   │   └── test.vue
│   ├── pagelet
│   │   └── home
│   │       ├── home-container.vue
│   │       ├── home-footer.vue
│   │       └── home-header.vue
│   ├── router
│   │   ├── config
│   │   │   ├── app.js
│   │   │   ├── audit.js
│   │   │   └── crm.js
│   │   └── js_tpl
│   │       ├── app.js
│   │       ├── audit.js
│   │       └── crm.js
│   ├── store
│   │   └── index.js
│   ├── template
│   │   ├── App.vue
│   │   ├── index_normal.html
│   │   ├── index_rem.html
│   │   └── main.js
│   └── ui
│       ├── base
│       │   ├── index.js
│       │   ├── register
│       │   │   └── plugin.js
│       │   ├── src
│       │   │   └── toast
│       │   │       ├── index.js
│       │   │       ├── toast.vue
│       │   │       └── toast_plugin
│       │   │           └── index.js
│       │   └── styles
│       │       ├── base.styl
│       │       ├── color.styl
│       │       ├── font.styl
│       │       ├── index.styl
│       │       └── transition.styl
│       └── business
│           └── loading
│               └── loading.vue
└── static
```

## 2.1 webpack+多页配置

脚手架需要配置的主要是**build/config/entry.json**、**config/index.js**。

```
├── build # webpack 配置
│   ├── build.js
│   ├── check-versions.js
│   ├── config
│   │   └── entry.json
│   ├── dll
│   │   ├── vendor-manifest.json
│   │   └── vendor.dll.js
│   ├── entry.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.dll.conf.js
│   └── webpack.prod.conf.js
├── config # dev/prod 配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
```



**build/config/entry.json**定义了需要传入的entry，传入单个为单页SPA、传入多个的时候为多页页面。

```javascript
{
    "app": {
        "filename": "views/app.html", // build的文件目录+文件名称
        "template": "./src/template/index_rem.html", // html模版
        "chunkName": "app", // chunk name
        "jsTplPath": "./src/router/js_tpl/app.js", // entry文件地址
        "isUseRem": true // 是否使用rem
    }, 
	...
}
```

html模版有rem模版、normal模版，使用rem模版时，isUseRem为true，此时会使用px2rem-loader(**build/utils**可更改px2rem-loader配置)。

**config/index.js**中定义后端接口、proxytable等内容, server 为后端配置的接口，包含联调环境、线上环境等。proxytable主要代理多页的页面代理，例如路由处理、后端接口代理、线索登录代理等。

```javascript
...
let server = 'http://10.8.123.63:19527'; // yanghua环境
// server = 'http://10.8.160.227:19527'; // jinkang环境
// server = 'http://10.8.122.19:19527'; // zhenglin环境
// server = 'http://10.8.125.40:9527'; // jinkang crm app
// server = 'https://crm.bytedance.com';

// default server config
const defaultServerConfig = {
    target: server,
    changeOrigin: true,
    secure: false,
    headers: {
        Referer: 'https://crm.bytedance.com',
    },
};

const getUrl = req => {
    return req.originalUrl.replace(/(\/)?\?.*/, '');
};

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
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
            '/crm/v2': defaultServerConfig,
            '/crm/redirect': defaultServerConfig,
            '/crm/all_logout/': defaultServerConfig,
            '/passport': {
                target: 'https://crm.bytedance.com',
                changeOrigin: true,
                secure: false,
                headers: {
                    Referer: 'https://crm.bytedance.com',
                },
            },
        },
		....
    },
};

```

##2.2 源代码配置

src为貘大设计的项目结构，主要功能如下:
API模块功能参考(https://wiki.bytedance.net/pages/viewpage.action?pageId=230765159)
```
├── src  # 源代码配置
│   ├── assets ## 静态资源地址，包括图片、视频、音频等
│   │   └── loading-small.gif
│   ├── io ## 接口配置，包括API+Request-model的配置、接口代理、SSO SDK登录等。
│   │   ├── account.js
│   │   ├── axios_intercption.js
│   │   ├── common.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── other.js
│   │   └── sdk_login.js
│   ├── lib ## 工具方法，比如一些常用的dom计算、日期计算方法
│   │   ├── dom
│   │   │   └── rect.js
│   │   └── utils
│   │       └── fail_api.js
│   ├── page ## 页面，每个vue代表一个页面
│   │   ├── api-request.vue
│   │   ├── crm-test.vue
│   │   ├── home.vue
│   │   └── test.vue
│   ├── pagelet ## 页面片段，例如home页的header、container、footer等
│   │   └── home
│   │       ├── home-container.vue
│   │       ├── home-footer.vue
│   │       └── home-header.vue
│   ├── router ## 路由配置
│   │   ├── config ## 路由配置
│   │   │   ├── app.js
│   │   │   ├── audit.js
│   │   │   └── crm.js
│   │   └── js_tpl ## js entry 模版页
│   │       ├── app.js
│   │       ├── audit.js
│   │       └── crm.js
│   ├── store ## vuex 
│   │   └── index.js
│   ├── template ## 模版页，包括html、App.vue等
│   │   ├── App.vue
│   │   ├── index_normal.html
│   │   ├── index_rem.html
│   │   └── main.js
│   └── ui ## ui组件库
│       ├── base ## 基础组件库，例如input、data、checkbox等基础的组件库
│       │   ├── index.js
│       │   ├── register
│       │   │   └── plugin.js
│       │   ├── src
│       │   │   └── toast
│       │   │       ├── index.js
│       │   │       ├── toast.vue
│       │   │       └── toast_plugin
│       │   │           └── index.js
│       │   └── styles
│       │       ├── base.styl
│       │       ├── color.styl
│       │       ├── font.styl
│       │       ├── index.styl
│       │       └── transition.styl
│       └── business ## 业务公共组件库，例如多个页面共享的组件、与后端接口耦合的一些组件
│           └── loading
│               └── loading.vue
└── static ## 静态资源
```



## 2.3 上线相关

项目其他部分为SCM、上线模块。

```
├── app.js	# node服务，基于express服务
├── bin 	# node服务启动设置
│   └── www
├── bootstrap.sh # 启动脚本，服务上线后服务器启动脚本
├── fat-config.js # crm测试配置，如不需要可忽略
├── online_log # 上线log，如不需要可忽略
├── pack_web.sh # crm测试脚本，如不需要可忽略
├── pm2.json # pm2 启动配置
├── scm_build.sh # scm build 脚本
├── scm_build_resource.sh # scm resource配置
├── scripts # yarn配置
│   ├── yarn-0.24.6.js
│   └── yarn-1.3.2.js
├── settings.py # PSM配置
```

