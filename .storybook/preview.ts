import 'virtual:windi.css';
import { setup } from '@storybook/vue3';
import type { DecoratorFunction, Parameters } from '@storybook/csf';
import { createI18n } from 'vue-i18n';
import { withDarkMode } from './withDarkMode.decorator'
import '@/themes.css';

setup((app) => {
  app.use(createI18n({}));
});

export const parameters: Parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  actions: { argTypesRegex: '^(on[A-Z]|update:).*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators: DecoratorFunction[] = [
  withDarkMode,
  (story) => ({
    components: { story },
    template:
      '<div style="display: flex; align-items: center; justify-content: center;"><story /></div>',
  }),
];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "paintbrush",
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};