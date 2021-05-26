<template lang="pug">
    div.loading(:style="{'height': height}")
</template>
<style lang="stylus" scoped>
    .loading
        width 100%
        height 100%
        background url('~ASSETS/loading-small.gif') no-repeat center
        background-size 25%
</style>
<script>
export default {
    name: 'loading-ui',
    data() {
        return {
            height: '',
        };
    },
};
</script>
