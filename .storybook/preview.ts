import 'virtual:windi.css';
import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';

setup((app) => {
  app.use(createI18n({}));
});

export const parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story) => ({
    components: { story },
    template:
      '<div style="display: flex; align-items: center; justify-content: center;"><story /></div>',
  }),
];
