<template lang="pug">
.test
    p.title hello world
    p.content {{msg}}
</template>

<script>
export default {
    name: 'Test',
    data() {
        return {
            msg: 'Welcome to Your CRM Vue.js App',
        };
    },
    methods: {
    },
};
</script>

<style lang="stylus" scoped>
.hello
    padding 20px 30px
    .title
        font-size 14px
        coloe #222222
        line-height 20px
    .content
        margin-top 16px
        font-size 12px
        color #666666
        line-height 17px
</style>
