import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

routes.push({
  path: '/:pathMatch(.*)*',
  name: '404',
  redirect: { name: 'index' },
});

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
