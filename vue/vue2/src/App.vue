<template>
  <div>
    <test></test>
  </div>
</template>

<script>
import test from './components/Test.vue';
export default {
  name: "App",
  components:{
    test
  },
  data() {
    return {
      name: "jmz",
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
