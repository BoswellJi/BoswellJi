import { createApp } from 'vue'
import { createPinia } from 'pinia';

import '@/theme/main.css';
import '@/theme/app.scss';
import 'element-plus/dist/index.css';

import lcComponents from '@/components';
import lcDirectives from '@/directives';

import App from './App.vue'

const app = createApp(App);

lcComponents(app);
lcDirectives(app);

app.use(createPinia());

app.mount('#app');
