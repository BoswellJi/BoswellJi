import './css-module1.css';
import { createApp } from 'vue';
import App from './module3.vue';
import router from './router/index';
import { reduce } from './commonjs1';
import add from './commonjs2';

add(2, 1);
reduce(2, 1);

createApp(App).use(router).mount('#app');

// module1被打包为全局变量
console.log(module1.module1);