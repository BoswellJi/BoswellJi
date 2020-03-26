<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import "reflect-metadata";


@Desc()
class Test {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function Desc(){
  return function(t){
    console.log(Reflect.getMetadata('design:paramtypes', t));
  }
}

export default {
  name: "App",
  components: {
    HelloWorld
  },
  created() {
    const testMeta = Reflect.getMetadata('design:paramtypes',Test);
    console.log(testMeta);
  }
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
