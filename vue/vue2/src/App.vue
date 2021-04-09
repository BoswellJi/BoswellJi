<template>
  <div>
    <test @testClickHandle="testClickHandle"></test>
    <test1 @test1ClickHandle="test1ClickHandle"></test1>
    <div id="text">
      {{ text }}
    </div>
    <button @click="appClickhandle">点击</button>
  </div>
</template>

<script>
import test from "./components/test";
import test1 from "./components/test1";
import hoc from "./hoc.jsx";
import { createHOC } from "vue-hoc";

const options = {
  created() {
    console.log("Created");
  },
};

export default {
  name: "App",
  components: {
    testHoc: hoc(test),
    test: createHOC(test, options),
    test1: createHOC(test1, options),
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function () {
      const dom = document.querySelector("#text");
      console.log(dom.innerHTML);
    });
    this.text = "async";
  },
  data() {
    return {
      text: "sync",
      name: "Boswell",
    };
  },
  methods: {
    appClickhandle() {

    },
    test1ClickHandle(e) {
      console.log(e);
    },
    testClickHandle(e) {
      console.log(e);
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
