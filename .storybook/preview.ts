import { setup } from '@storybook/vue3';
import type { DecoratorFunction, Parameters } from '@storybook/csf';
import { usePlugins } from '../src/plugins';
import { withDarkMode } from './with-dark-mode.decorator';

setup((app) => {
  usePlugins(app);
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
