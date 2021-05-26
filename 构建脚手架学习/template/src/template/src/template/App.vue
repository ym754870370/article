<template lang='pug'>
  div#app
    transition(name='fade' mode='out-in')
      loadingUI(v-show='loading' key='loading')
    router-view(:style="{'display': loading ? 'none' : ''}")
</template>

<script>
import loadingUI from 'UI/business/loading/loading.vue';

export default {
    name: 'App',
    components: {
        loadingUI,
    },
    data() {
        return {
        };
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        },
    },
    methods: {
    },
    beforeMount() {
    },
};
</script>

<style lang="stylus" scoped>
#app
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    font-family font-regular
    background white
    text-align center
    color #2c3e50
    overflow auto
</style>
