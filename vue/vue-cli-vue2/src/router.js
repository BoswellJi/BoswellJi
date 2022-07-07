import VueRouter from 'vue-router';
import Vue from 'vue';
import test from './components/test';
import test1 from './components/test1';
import test2 from './components/test2';
import test3 from './components/test3';
import test4 from './components/test4';
import video from './components/video';
import html2canvas from './components/html2canvas';

Vue.use(VueRouter);

const routes = [
  { path: '/test1', component: test1 },
  { path: '/test', component: test },
  {
    path: '/test2',
    component: test2,
    alias: '/jmz',
    props: {
      test2: true,
    },
    children: [
      {
        path: 'test3',
        component: test3,
        props: {
          test3: true,
        },
        children: [
          {
            path: 'test4',
            component: test4,
            props: {
              test4: true,
            },
          },
        ],
      },
    ],
  },
  { path: '/test3', component: test3 },
  { path: '/c/:id/d/:name', component: test4 },
  { path: '/video', component: video },
  { path: '/html2canvas', component: html2canvas },
  {
    path: '/three',
    component: () => import('./components/three'),
  },
  {
    path: '/video.js',
    component: () => import('./components/video.js'),
  },
  {
    path: '/vant',
    component: () => import('./components/vant'),
  },
  {
    path: '/html2pdf',
    component: () => import('./components/html2pdf.js'),
  },
  {
    path: '/vuedraggable',
    component: () => import('./components/vuedraggable'),
  },
  {
    path: '/test1',
    component: () => import('./components/test1'),
  },
  {
    path: '/jspdf',
    component: () => import('./components/jspdf'),
    props: {
      a: 1,
      b: 2,
    },
  },
  {
    path: '/pdfmake',
    component: () => import('./components/pdfmake'),
  },
  {
    path: '/elementui',
    component: () => import('./components/elementui'),
  },
  {
    path:'/vue3-1',
    component: () => import('./components/vue3-1'),
  },
  {
    path:'/vue3-2',
    component: () => import('./components/vue3-1'),
  },
  {
    path:'/mult-page-vue2',
    component: () => import('./components/vue3-1'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  // mode:'history'
});

export default router;
