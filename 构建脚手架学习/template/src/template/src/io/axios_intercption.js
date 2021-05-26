import axios from 'axios';
// import camelData from 'camel-data';

axios.interceptors.request.use(
    config => {
        if (
            /starling\.snssdk\.com\/|starling-va\.byteoversea\.com\//.test(
                config.url,
            )
        ) {
            // Starling平台的跨域参数不能加上自定义header，否则会走options预检导致404
            return config;
        }
        if (config.method === 'get') {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                // ...config.params,
            };
        }
        config.headers['accept-language'] = localStorage.getItem('lang_type');
        const token =
            decodeURIComponent(
                document.cookie.replace(
                    new RegExp(
                        '(?:(?:^|.*;)\\s*' +
                            encodeURIComponent('csrftoken').replace(
                                /[-.+*]/g,
                                '\\$&',
                            ) +
                            '\\s*\\=\\s*([^;]*).*$)|^.*$',
                    ),
                    '$1',
                ),
            ) || null;
        config.headers = Object.assign(config.headers || {}, {
            'X-CSRFToken': token,
        });
        return config;
    },
    function(error) {
        return Promise.reject(error);
    },
);

/**
 * reponse拦截，添加错误处理
 */
axios.interceptors.response.use(
    response => {
        // response.data = camelData(response.data);
        checkNotLogin(response);
        pageLoad(response);
        return response;
    },
    error => {
        checkNetworkStatus(error);
        return Promise.reject(error);
    },
);
function pageLoad(response) {
    try {
        if (response.data.need_update === 1) {
            window.location.reload();
        }
    } catch (e) {}
}

/**
 * 小流量重载
 */
function checkNotLogin(response) {
    // const pathName = window.location.pathname;
    // if (pathName.indexOf('/app/login') > -1) {
    //     return false;
    // }
    // if (response.data.errorCode === 3000 || (response.data.status === 'fail' && response.data.msg === '用户未登录')) {
    //     const fromSource = location.pathname + location.search;
    //     window.location.href = `/app/login?fromSource=${fromSource}`;
    // }
}

/**
 * 网络错误检测
 */
function checkNetworkStatus(err) {
    if (err && err.response) {
        let errmsg = '';
        switch (err.response.status) {
        case 400:
            errmsg = '请求错误!';
            break;
        case 401:
            errmsg = '未授权，请登录!';
            break;
        case 403:
            errmsg = '拒绝访问';
            const code = err.response.data.code;
            if (code === 1040311) {
                window.location.href = `${
                    err.response.data.msg
                }?redirect_uri=${encodeURIComponent(
                    window.location.pathname + window.location.search,
                )}`;
            };
            if (code === 80049) {
                // 重定向不做处理
                const data = err.response.data.data;
                const { action } = data;
                const appId = data.kani_app_id;
                const resourceKey = data.resource_key;
                window.location.href = `https://ee.byted.org/kani/v2/#/apply/workflow/?appId=${appId}&&resourceKey=${resourceKey}&&action=${action}`;
            };
            // 门神无权限
            // if (code === 80082) {
            //     window.widget.show();
            // }
            // window.location.href = '/app/permission';
            break;
        case 404:
            errmsg = `请求地址出错: ${err.response.config.url}!`;
            break;
        case 405:
            errmsg = '请求方法不允许!';
            break;
        case 408:
            errmsg = '请求超时!';
            break;
        case 500:
            errmsg = '服务器内部错误!';
            break;
        case 501:
            errmsg = '服务未实现!';
            break;
        case 502:
            errmsg = '网关错误!';
            break;
        case 503:
            errmsg = '服务不可用!';
            break;
        case 504:
            errmsg = '网关超时!';
            break;
        case 505:
            errmsg = 'HTTP版本不受支持!';
            break;
        default:
            break;
        }
        if (errmsg) {
            console.log({ title: errmsg });
        }
    } else {
        const errmsg = '您的网络出现问题了!';
        console.log({ title: errmsg });
    }
    return false;
}
