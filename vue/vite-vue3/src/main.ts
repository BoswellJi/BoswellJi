import './public-path';
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";


let instance = null;
let dom = null;
function render(props = {}) {
  const app = createApp(App);
  instance = app;
  app.use(createPinia());
  app.use(router);
  dom = app.mount('#app')
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
  dom.$el.innerHTML = '';
  instance = null;
}