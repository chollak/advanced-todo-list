<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/todo">Todo</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("setTodos");
  }
};
</script>>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
