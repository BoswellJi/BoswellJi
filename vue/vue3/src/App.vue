<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="clickHandle" />
  <transition name="fade" appear>
    <HelloWorld v-if="fadeShow" msg="Welcome to Your Vue.js App" />
  </transition>
  <teleport to="#con">
    <div>teleport</div>
  </teleport>
  {{num}}
  <input v-model="num" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this);
  },
  setup() {
    const fadeShow = ref(true);
    function clickHandle() {
      fadeShow.value=!fadeShow.value;
    }

    onMounted(() => {
      console.log("onMounted");
    });

    return {
      clickHandle,
      num: ref(1),
      fadeShow,
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

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
