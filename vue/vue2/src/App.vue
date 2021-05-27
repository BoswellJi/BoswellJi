<template>
  <div>
    <test @testClickHandle="appClickhandle"></test>
    <test1 @test1ClickHandle="test1ClickHandle">
      <template v-slot:default="slotProps">
        default slot content<br />
        user:{{ slotProps.user.name }}<br />
        person:{{ slotProps.person.name }}<br />
      </template>
      <template v-slot:header="slotProps">
        {{ slotProps }}
      </template>
    </test1>
    <async-example></async-example>
    <router-view></router-view>
    <router-link to="/a">test3</router-link>
    <router-link to="/b">test2</router-link>
    <test4></test4>
    <div @click="getAge">
      <div>state:{{ $store.state.age }}</div>
      <div>getterAge:{{ getterAge }}</div>
      <div>mod1Name：{{ mod1Name }}</div>
      <div>mod1NameCopy:{{ mod1NameCopy }}</div>
      <div>getterMod1Name:{{ getterMod1Name }}</div>
    </div>
  </div>
</template>

<script>
import test from "./components/test";
import test1 from "./components/test1";
import test4 from "./components/test4";
import hoc from "./hoc.js";
import { createHOC } from "vue-hoc";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

const options = {
  created() {
    console.log("Created", "createHOC");
  },
};

export default {
  name: "App",
  components: {
    testHoc: hoc(test),
    test: createHOC(test, options),
    test1: createHOC(test1, options),
    test4,
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function() {
      const dom = document.querySelector("#text");
    });
    this.$store.state.name;
  },
  computed: {
    ...mapGetters(["getterAge"]),
    ...mapGetters({
      getterMod1Name: "mod1/getterMod1Name",
    }),
    ...mapState({
      mod1Name: (state) => state.mod1.mod1Name,
    }),
    ...mapState({
      mod1NameCopy: (state) => state.mod1.mod1Name,
    }),
  },
  data() {
    return {
      text: "sync",
      name: "Boswell",
      age: 21,
    };
  },
  methods: {
    ...mapMutations(["addAge"]),
    ...mapActions(["getAge"]),
    appClickhandle() {
      // this.$store.commit('addAge');
      this.$store.dispatch('getAge');
    },
    test1ClickHandle(e) {
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
