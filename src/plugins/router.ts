import { createRouter as create, createWebHistory } from 'vue-router';
import routes from '~pages';
import { useStateStore } from '@/stores/state';

export const createRouter = (history = createWebHistory()) => {
  const state = useStateStore();

  routes.push({
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: { name: 'index' },
  });

  const router = create({
    history,
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (state.connected || to.name === 'index') {
      next();
    } else {
      next({ name: 'index' });
    }
  });

  return router;
};
