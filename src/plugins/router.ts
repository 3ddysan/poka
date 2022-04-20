import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

const INDEX = { name: 'index' };
routes.forEach((route) => {
  if (route.name !== 'index') {
    route.beforeEnter = (to, from, next) => {
      if (useUserStore().connected) {
        next();
      } else {
        next(INDEX);
      }
    };
  }
});
routes.push({
  path: '/:pathMatch(.*)*',
  name: '404',
  redirect: INDEX,
});

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
