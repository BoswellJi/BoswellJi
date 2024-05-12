import './css-module1.css';

import { createApp } from 'vue';
import App from './module3.vue';

import comm1,{ reduce } from './commonjs1';
import add from './commonjs2';

import esm,{esmAdd} from './esm';
import router from './router/index';

add(2, 1);
reduce(2, 1);
comm1();

esm(2, 3);
esmAdd('ss');

createApp(App).use(router).mount('#app');

// module1被打包为全局变量
console.log(module1.module1);