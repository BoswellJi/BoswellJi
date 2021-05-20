import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.component('async-example',()=> import('./components/async-test3'))

// 相当于App之上还有一个元素
// 生成vnode之后是update，patch
const vm = new Vue({
  render: (h) => h(App),
});

vm.$mount("#app");
