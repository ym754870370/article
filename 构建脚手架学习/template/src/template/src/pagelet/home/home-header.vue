<template lang="pug">
.home-header
    span.left left
    span.right right
</template>

<script>
export default {
    name: 'home-header',
};
</script>

<style lang="stylus" scoped>
.home-header
    span.left
    span.right
        font-size 14px
        line-height 20px
        color #f06395
        width 50%
        text-align center
        display inline-block
    span.left
        background #60fa95
        color white
</style>
