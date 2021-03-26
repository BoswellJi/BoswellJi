<template>
  <div>
    <test :name="name"></test>
     {{ text }}
    <button @click="clickhandle">点击</button>
  </div>
</template>

<script>
import test from './components/test';

export default {
  name: "App",
  components:{
    test
  },
  beforeUpdate() {
    console.log("app before update");
  },
  updated() {
    console.log("app updated");
  },
  data() {
    return {
      text: "test",
      name: 'Boswell'
    };
  },
  methods: {
    clickhandle() {
      this.text = "test1";
      this.name = 'jmz';
    },
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
