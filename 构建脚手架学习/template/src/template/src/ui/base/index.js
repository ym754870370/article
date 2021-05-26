import plugin from './register/plugin';

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin.install);
}

// module.exports = plugin;
export default plugin;
