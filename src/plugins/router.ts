import { createRouter as create, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

export const createRouter = (history = createWebHistory()) => {
  routes.push({
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/',
  });
  return create({
    history,
    routes,
  });
};
