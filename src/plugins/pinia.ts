import { createPinia as _createPinia } from 'pinia';
import type { Router } from 'vue-router';

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
