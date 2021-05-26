const home = r => require.ensure([], () => r(require('@/page/home')), 'homeChunk');

// import home from './page/home';

export default {
    router: [
        {
            path: '/audit_cli_template_test/audit/home',
            name: 'home',
            require: home,
        },
    ],
    redirect: {
        path: '/audit_cli_template_test/audit/home',
    },
};
