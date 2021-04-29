<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="clickHandle" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  {{ num }}
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    function clickHandle() {
      this.num++;
    }

    return {
      clickHandle,
      num: ref(1),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
