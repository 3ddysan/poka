import path from 'node:path';
import { mergeConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        Components({ dts: false }),
        AutoImport({
          dts: false,
          imports: ['vue', 'vue-router'],
        }),
        WindiCSS(),
      ],
      resolve: {
        alias: {
          '@': path.join(__dirname, '../src'),
        },
      },
    });
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/vue3-vite',
};

export default config;