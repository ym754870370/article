<template lang="pug">
    .crm-app-toast
        transition(name="toast-fade")
            .toast(
                :style="{width: width}"
                :class="toastClass"
                v-show="show"
            )
                p.toast-content(
                    v-if="text"
                    v-html="text"
                )
                p.toast-content(v-else)
                    slot
</template>

<script>
export default {
    name: 'crm-app-toast',
    props: {
        value: Boolean,
        time: {
            type: Number,
            default: 1000,
        },
        width: {
            type: String,
            default: '',
        },
        text: String,
    },
    computed: {
        toastClass() {
            return {};
        },
    },
    data() {
        return {
            show: false,
        };
    },
    created() {
        if (this.value) {
            this.show = true;
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.$emit('input', true);
                this.$emit('show');
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.$emit('input', false);
                    this.$emit('hide');
                }, this.time);
            }
        },
        value(val) {
            this.show = val;
        },
    },
};
</script>

<style lang="stylus">
@import '~@/ui/base/styles/index.styl/'
.crm-app-toast
    .toast
        position fixed
        z-index toast-z-index
        width toast-width
        min-height toast-height
        top toast-top
        left toast-left
        margin-left toast-height-half
        background toast-background
        text-align center
        border-radius toast-radius
        color white
        transform translateX(-50%)
        margin-left 0!important
        .toast-content
            font-size: toast-font-size
            padding: toast-content-top-padding toast-content-left-padding
    .toast-fade-enter-active, .toast-fade-leave-active
        transition opacity .5s
    .toast-fade-enter, .toast-fade-leave-to
        opacity 0

</style>
