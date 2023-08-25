import { type Plugin } from 'vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

export const createFloatingElements = (): Plugin => {
  return {
    install(app) {
      app.use(FloatingVue, {
        themes: {
          settings: {
            $extend: 'menu',
            $resetCss: true,
            triggers: ['click', 'hover', 'touch'],
          },
          alert: {
            $extend: 'dropdown',
            $resetCss: true,
            triggers: [],
            placement: 'top',
            autoHide: false,
          },
        },
      });
    },
  };
};
