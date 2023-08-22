import Vue from 'vue'
import App from './App.vue'
import graph from 'fbgraph';
import { parseInt, cloneDeep } from 'lodash';

console.log(parseInt('1231', 10),cloneDeep);

Vue.config.productionTip = false

new App().$mount()
