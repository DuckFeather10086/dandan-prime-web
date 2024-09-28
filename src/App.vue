<!-- src/App.vue -->
<template>
 
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

// import SeasonDetail from './components/SeasonDetail.vue';
// import MoviePosterWall from './components/MoviePosterWall.vue';
// import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    // SeasonDetail,
    //MoviePosterWall
    // Player,
  },  
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  margin: 0;
  padding: 0;
}
</style>