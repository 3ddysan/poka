import { createPinia as _createPinia } from 'pinia';
import type { createRouter } from 'vue-router/auto';

type Router = ReturnType<typeof createRouter>;

declare module 'pinia' {
  export interface Pinia {
    router: Router;
  }
}

export const createPinia = (router: Router) => {
  const pinia = _createPinia();
  pinia.router = router;
  return pinia;
};
