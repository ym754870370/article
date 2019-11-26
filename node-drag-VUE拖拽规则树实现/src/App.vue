<template>
  <div id="app">
    <div class="drag-box">
      <Node :data="data" />
    </div>
  </div>
</template>

<script>
import Node from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    Node
  },
  created() {
    this.data = this.$store.state.data;
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
