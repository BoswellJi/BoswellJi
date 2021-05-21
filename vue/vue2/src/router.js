import VueRouter from 'vue-router';
import Vue from 'vue'
import test1 from "./components/test1";
import test2 from "./components/test2";
import test3 from "./components/test3";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: test1 },
    { path: '/a', component: test2 },
    { path: '/b', component: test3 }
  ]

export default new VueRouter({
    routes
});