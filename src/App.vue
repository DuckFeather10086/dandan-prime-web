<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

import Navbar from './components/naviBar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  /* min-height: 30vh; */
  /* background-color: #2c3e50;  */
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>