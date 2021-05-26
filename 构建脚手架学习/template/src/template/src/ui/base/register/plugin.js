
import crmAppToast from '../src/toast';

import crmAppToastPlugin from '../src/toast/toast_plugin';

const components = [
    crmAppToast,
];

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }

    components.map(v => {
        Vue.component(v.name, v);
    });
    Vue.prototype.$toast = crmAppToastPlugin;
}

export default {
    install: plugin,
    ...components,
};
