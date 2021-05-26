import Vuex from 'vuex';

// user Store
const store = new Vuex.Store({
    state: {
        loading: false,
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
    },
    modules: {
    },
});

export default store;
