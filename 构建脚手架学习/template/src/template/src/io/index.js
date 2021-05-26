import './axios_intercption';
import RequestModel from 'request-model';
import fushenList from './fushenList';

export const rModel = new RequestModel({
    modules: {
        fushenList,
    },
    request: {},
});

// api定义export
export const appApi = {};

export default appApi;
