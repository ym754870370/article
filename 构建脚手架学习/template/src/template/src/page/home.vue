<template lang="pug">
.home
    home-header()
    home-container()
    home-footer()
</template>

<script>
import homeHeader from 'PAGELET/home/home-header';
import homeContainer from 'PAGELET/home/home-container';
import homeFooter from 'PAGELET/home/home-footer';

export default {
    name: 'home',
    components: {
        homeHeader,
        homeContainer,
        homeFooter,
    },
};
</script>
