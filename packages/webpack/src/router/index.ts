import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      component: () => import('../module4')
    },
    {
      path: '/module6',
      component: () => import('../module6.vue')
    },
    {
      path: '/module8',
      component: () => import('../module8')
    }
  ]
});

export default router;