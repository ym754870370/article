import 'eventsource-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false;

export default (config) => {
    new Vue(config);
};
