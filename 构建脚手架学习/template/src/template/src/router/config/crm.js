const crmTest = r => require.ensure([], () => r(require('@/page/crm-test')), 'crmChunk');

export default {
    router: [
        {
            path: '/audit_cli_template_test/crm/test',
            name: 'crm',
            require: crmTest,
        },
    ],
    redirect: {
        path: '/audit_cli_template_test/crm/test',
    },
};
