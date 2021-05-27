import Vue from "vue";
import App from "./App.vue";
import router from './router';
import vuex from './store';

Vue.config.productionTip = false;

Vue.component('async-example',()=> import('./components/async-test3'))

// 相当于App之上还有一个元素
// 生成vnode之后是update，patch
const vm = new Vue({
  render: (h) => h(App),
  router,
  store:vuex
});

vm.$mount("#app"); 
