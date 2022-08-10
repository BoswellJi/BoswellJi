/* eslint-disable */
import './public-path';
import { createApp } from 'vue'
import App from './App.vue'


let router = null;
let instance = null;

function render(props){
  const { container } = props;

  instance = createApp(App)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  // instance.$destroy();
  // instance.$el.innerHTML = '';
  instance = null;
  router = null;
}