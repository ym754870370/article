import axios from 'axios';
import './axios_intercption';
// import store from '@/store/';

const failCallback = (error, cb) => {
    if (error.response.status === 403 && error.response.data.code === 1040311) {
        // 重定向不做处理
    } else {
        cb(error.response.data.msg);
    }
};

export default {
    request: {
        postFile(success, fail, formdata) {
            axios.post('/audit/common_ticket_admin/api/common/upload', formdata).then(res => {
                if (res.data.status === 200) {
                    success(res.data.data);
                } else {
                    fail(res.data.msg);
                }
            }).catch(e => {
                failCallback(e, fail);
            });
        },
        getHistoryOrder(success, fail, data) {
            axios
                .get(`/audit/common_ticket_admin/api/user/${data.appId}/query_ticket_list`, { params: data.params })
                .then(res => {
                    if (res.data.status === 200) {
                        success(res.data.data);
                    } else {
                        fail(res.data.msg);
                    }
                }).catch(e => {
                    failCallback(e, fail);
                });
        },
    },
    config: {
        promiseWrap: true,
    },
};
