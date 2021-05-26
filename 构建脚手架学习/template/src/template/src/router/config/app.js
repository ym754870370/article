// const test = r => require.ensure([], () => r(require('@/page/test')), 'testChunk');
// const apiRequest = r => require.ensure([], () => r(require('@/page/api-request')), 'apiRequestChunk');

import test from '@/page/test';
import apiRequest from '@/page/api-request';

export default {
    router: [
        {
            path: '/audit_cli_template_test/app/test',
            name: 'test',
            require: test,
        },
        {
            path: '/audit_cli_template_test/app/api-request',
            name: 'api-request',
            require: apiRequest,
        },
    ],
    redirect: {
        path: '/audit_cli_template_test/app/test',
    },
};
