import VueRouter from "vue-router";
import Vue from "vue";
import test from "./components/test";
import test1 from "./components/test1";
import test2 from "./components/test2";
import test3 from "./components/test3";
import test4 from "./components/test4";

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
];

const router = new VueRouter({
  routes,
  // mode:'history'
});

export default router;
