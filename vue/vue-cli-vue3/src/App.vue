<template>
  <div>
    <!-- <transition name="fade" appear>
      <HelloWorld msg="App" />
    </transition>
    <teleport to="#con">
      <div>teleport</div>
    </teleport>
    <div @click="clickHandle">点击</div>
    <comp1 :msg="fadeShow"></comp1>

    <div v-memo="[value1,value2]">
      {{value1}}{{value2}}
    </div>

    <div id="con"></div> -->
    vue3-1kkkkkk
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted, reactive, h } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Comp1: {
      props: {
        msg: Boolean,
      },
      render() {
        return h("div");
      },
    },
  },
  computed: {
    testComputed() {
      return this.reactiveState.name;
    },
  },
  watch: {
    ["reactiveState.name"]() {
      return "hhh";
    },
  },
  setup() {
    const fadeShow = ref(true);
    const value1 = ref("value1");
    const value2 = ref("value2");
    const reactiveState = reactive({
      name: "Boswell",
    });
    function clickHandle() {
      console.log('test');
    }

    onMounted(() => {});

    return {
      clickHandle,
      fadeShow,
      reactiveState,
      value1,
      value2,
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

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 1000ms;
  transition-timing-function: ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
