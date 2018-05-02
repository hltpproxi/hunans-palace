<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  padding-bottom: 40px;
}

body {
  background: -webkit-linear-gradient(left, #FF0005, #ffbe6a);
  background: -o-linear-gradient(right, #FF0005, #ffbe6a);
  background: -moz-linear-gradient(right, #FF0005, #ffbe6a);
  background: linear-gradient(to right, #FF0005, #ffbe6a);
}

html {
  background: orange;
}
</style>
