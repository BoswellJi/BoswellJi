<template>
  <div id="app" @click="clickFn">
    {{ msg }}
    {{ msgCopy }}
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    const arr = [1, 2, [3, 4]];
    const arrTemp = arr.flat();
    // console.log(arr);
  },
  computed: {
    msgCopy() {
      return this.a + "d";
    },
  },
  data() {
    return {
      msg: "abc",
      name: "jmz",
    };
  },
  methods: {
    clickFn() {
      this.a = "jjj";
      this.msg = "name";
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
