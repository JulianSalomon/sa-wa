<template>
  <div id="app">
    <home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "@/views/Home.vue";

@Component({
  components: { Home }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
