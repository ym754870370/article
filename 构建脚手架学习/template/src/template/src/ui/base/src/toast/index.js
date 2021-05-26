import toast from './toast.vue';

toast.install = function(Vue) {
    Vue.component(toast.name, toast);
};

export default toast;
