import Vue from 'vue';
import App from './App.vue';
import './public-path';

Vue.config.productionTip = false;

let instance = null;
function render(props = {}) {
  console.log(props);
  instance = new Vue({
    render: (h) => h(App),
  }).$mount('#app');
}

// when run independently
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.unmount();
  instance.$el.innerHTML = '';
  instance = null;
}
