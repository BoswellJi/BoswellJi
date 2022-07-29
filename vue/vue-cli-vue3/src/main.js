import './public-path';
import { createApp } from 'vue'
import App from './App.vue'

let instance= null;
let dom = null;
// function render(props = {}) {
//   const { container } = props;
//   instance = createApp(App)
//   dom = instance.mount(container ? container.querySelector('#app') : '#app1')
// }

// when run independently
// if (!window.__POWERED_BY_QIANKUN__) {
//   render();
// }

// export async function bootstrap() {
//   console.log('[vue] vue app bootstraped');
// }

// export async function mount(props) {
//   console.log('[vue] props from main framework', props);
//   render(props);
// }

// export async function unmount() {
//   instance.unmount();
//   dom.$el.innerHTML = '';
//   instance = null;
// }

instance = createApp(App)
dom = instance.mount('#app1')

console.log('test');