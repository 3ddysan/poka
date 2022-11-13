import type { StorybookConfig } from '@storybook/builder-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  framework: '@storybook/vue3-vite',
  core: {
    disableTelemetry: true,
  },
};

export default config;
