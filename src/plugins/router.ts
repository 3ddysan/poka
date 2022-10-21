import { createRouter as create, createWebHistory } from 'vue-router';
import routes from '~pages';
import { useStateStore } from '@/stores/state';

routes.push({
  path: '/:pathMatch(.*)*',
  name: '404',
  redirect: { name: 'index' },
});

const router = create({
  history: createWebHistory(),
  routes,
});

export const createRouter = () => {
  const state = useStateStore();

  router.beforeEach((to, from, next) => {
    if (state.connected || to.name === 'index') {
      next();
    } else {
      next({ name: 'index' });
    }
  });

  watch(
    () => state.connected,
    (connected) => {
      if (connected) {
        router.push({ name: 'plan' });
      } else {
        router.push({ name: 'index' });
      }
    },
  );

  return router;
};
