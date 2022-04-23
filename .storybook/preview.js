import { app } from '@storybook/vue3';
import { createPinia } from 'pinia';
import 'virtual:windi.css';

app.use(createPinia());

export const parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story) => ({
    components: { story },
    template: '<div style="display: flex; align-items: center; justify-content: center;"><story /></div>',
  }),
];