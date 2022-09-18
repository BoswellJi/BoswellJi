/* eslint-disable */
import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

let router = null;
let instance = null;

function render(props) {
  const { container } = props;
  router = createRouter({
    history: createWebHistory('/app1/'),
    routes: [{ path: '/about', component: () => import('./test1.vue') }],
  });

  instance = createApp(App).use(router);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance = null;
  router = null;
}
