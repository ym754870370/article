import Vue from 'vue';
import toast from '../toast.vue';

let instance;

const crmAppToastPlugin = options => {
    const Toast = Vue.extend(toast);
    const optionCalc = typeof options === 'string' ? { text: options } : options;
    instance = new Toast({
        propsData: {
            value: true,
            ...optionCalc,
        },
    });

    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
};

export default crmAppToastPlugin;
