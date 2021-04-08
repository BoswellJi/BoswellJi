<template>
  <div>
    <!-- <test :name="name"></test> -->
    <div id="text">
      {{ text }}
    </div>
    <button @click="clickhandle">点击</button>
  </div>
</template>

<script>
// @ts-ignore
import test from "./components/test";

export default {
  name: "App",
  components: {
    test,
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function () {
      const dom = document.querySelector("#text");
      // @ts-ignore
      console.log(dom.innerHTML);
    });
    this.text = "async";
  },
  beforeUpdate() {
    console.log("app before update");
  },
  updated() {
    console.log("app updated");
  },
  data() {
    return {
      text: "sync",
      name: "Boswell",
    };
  },
  methods: {
    clickhandle() {},
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
