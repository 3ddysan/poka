import { createRouter as create, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto/routes';
import { useStore } from '@/stores/state';

export const createRouter = (history = createWebHistory()) => {
  const state = useStore();

  routes.push({
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: { name: '/' },
  });

  const router = create({
    history,
  });

  router.beforeEach((to, from, next) => {
    if (state.connected || to.name === '/') {
      next();
    } else {
      next({ name: '/' });
    }
  });

  return router;
};
