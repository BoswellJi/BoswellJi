<template>
  <div>
    <test @testClickHandle="appClickhandle"></test>
    <!-- <test1 @test1ClickHandle="test1ClickHandle">
      <template v-slot:default="slotProps">
        default slot content<br />
        user:{{ slotProps.user.name }}<br />
        person:{{ slotProps.person.name }}<br />
      </template>
      <template v-slot:header="slotProps">
        {{ slotProps }}
      </template>
    </test1> -->
    <async-example></async-example>
  </div>
</template>

<script>
import test from "./components/test";
import test1 from "./components/test1";
import hoc from "./hoc.jsx";
import { createHOC } from "vue-hoc";

const options = {
  created() {
    console.log("Created", "createHOC");
  },
};

export default {
  name: "App",
  components: {
    // testHoc: hoc(test),
    // test: createHOC(test, options),
    // test1: createHOC(test1, options),
    test
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function () {
      const dom = document.querySelector("#text");
      console.log(dom?.innerHTML);
    });
    console.log(this);
  },
  data() {
    return {
      text: "sync",
      name: "Boswell",
      age: 21,
    };
  },
  methods: {
    appClickhandle() {
      this.text = "sync1";
      this.name = "ok";
    },
    test1ClickHandle(e) {
      console.log(e);
    }
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
