import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import { setup } from '@storybook/vue3';
import type { DecoratorFunction, Parameters } from '@storybook/csf';
import { createFloatingElements } from '../src/plugins/floating';
import { createInternationalization } from '../src/plugins/i18n';
import { withDarkMode } from './with-dark-mode.decorator';
import '@/themes.css';

setup((app) => {
  app.use(createFloatingElements()).use(createInternationalization());
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
      '<div style="display: flex; justify-content: center;"><story /></div>',
  }),
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
