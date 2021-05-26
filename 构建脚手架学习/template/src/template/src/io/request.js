import axios from 'axios';
import {
    isArray,
    isObject,
} from '../lib/utils/type';
import * as Sentry from 'Sentry';
/**
 * 公共的请求函数，简化操作处理
 * @param {Object} reqparams 请求参数, 包括请求方式、url
 * @param {Function} success 成功处理函数
 * @param {Function} fail 失败处理函数
 * @param {Function} libMatch match处理
 */
const request = (reqparams, success, fail, libMatch = data => data) => {
    // get url type params
    const { standard = true, url, type = 'get', params = {} } = reqparams;
    // format request params
    const $params = type === 'get' ? { params: params } : params;
    // common request
    if (type === 'postFormData') {
        axios({
            method: 'post',
            url: url,
            responseType: 'json',
            data: $params,
            withCredentials: true,
            transformRequest: [
                function(data) {
                    var params = new URLSearchParams();
                    for (const item in data) {
                        var value = data[item];
                        if (isObject(value) || isArray(value)) {
                            value = JSON.stringify(value);
                        }
                        params.append(item, value);
                    }
                    return params.toString();
                },
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
        })
            .then(data => {
                if (data.data.status === 'success' || data.data) {
                    success && success(libMatch(data.data));
                } else {
                    fail && fail(data.data);
                }
            })
            .catch(data => {
                fail && fail(data);
            });
    } else {
        axios[type](url, $params)
            .then(data => {
                if (!standard) {
                    success && success(libMatch(data.data));
                // 兼容老接口
                } else if (data.data.status === 'success' || data.data.message === 'success') {
                    success && success(libMatch(data.data));
                } else {
                    Sentry.captureException(new Error(data.data));
                    fail && fail(data.data);
                }
            })
            .catch(data => {
                const result = data.response ? data.response.data : data;
                Sentry.captureException(result);
                fail && fail(result);
            });
    }
};

export default request;
