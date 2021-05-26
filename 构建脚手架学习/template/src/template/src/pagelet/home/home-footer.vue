<template lang="pug">
.home-footer
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
    position fixed
    bottom 0
    left 0
    right 0
    z-index 999
    span.left
    span.right
        font-size 14px
        line-height 20px
        color #f06395
        width 50%
        text-align center
</style>
