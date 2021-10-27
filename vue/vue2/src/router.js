import VueRouter from "vue-router";
import Vue from "vue";
import test from "./components/Test";
import test1 from "./components/test1";
import test2 from "./components/test2";
import test3 from "./components/test3";
import test4 from "./components/test4";
import video from "./components/video";
import html2canvas from "./components/html2canvas";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: test1, },
  {
    path: "/a",
    component: test2,
    alias: "/jmz",
    children: [
      {
        path: "jmzc1",
        component: test,
      },
    ],
  },
  { path: "/b", component: test3 },
  { path: "/c/:id/d/:name", component: test4 },
  { path: "/video", component: video },
  { path: "/html2canvas", component: html2canvas },
  {
    path: '/three',
    component: () => import('./components/three')
  },
  {
    path: '/video.js',
    component: () => import('./components/video.js')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  // mode:'history'
});

export default router;
