/**
 * mapp app路由
 */
import main from '@/template/main';
import App from '@/template/App.vue';
import store from '@/store/index';
import Vue from 'vue';
import VueRouter from 'vue-router';
import config from '@/router/config/app';

Vue.use(VueRouter);

const routerConfig = config.router && config.router.map((res) => {
    return {
        path: res.path,
        component: res.require,
        name: res.name,
        props: res.props,
    };
});

// default redirect
routerConfig.push({
    path: '*', redirect: config.redirect.path,
});

const router = new VueRouter({
    mode: 'history',
    routes: routerConfig,
});

const render = {
    el: '#app',
    template: '<App/>',
    store,
    router,
    components: {
        App,
    },
};

// render page
main(render);
