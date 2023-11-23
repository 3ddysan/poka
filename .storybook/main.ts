import type { StorybookConfig } from '@storybook/vue3-vite';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
    argTypeTargetsV7: true,
  },
} satisfies StorybookConfig;
