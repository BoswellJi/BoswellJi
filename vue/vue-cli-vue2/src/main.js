import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuex from './store';
import Sortable from 'sortablejs';
import { Swap } from 'sortablejs/modular/sortable.core.esm';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { loadMicroApp, registerMicroApps, start } from 'qiankun';

Sortable.mount(new Swap());
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component('async-example', () => import('./components/async-test3'));

registerMicroApps([
  {
    name: 'vue3-1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/vue3-1',
  },
  {
    name: 'vue3-2',
    entry: '//localhost:7200',
    container: '#container',
    activeRule: '/vue3-2',
  },
  {
    name: 'mult-page-vue2',
    entry: '//localhost:7300',
    container: '#container',
    activeRule: '/mult-page-vue2',
  },
]);

start();

// 相当于App之上还有一个元素
// 生成vnode之后是update，patch
const vm = new Vue({
  render: (h) => h(App),
  router,
  store: vuex,
});

vm.$mount('#app');
