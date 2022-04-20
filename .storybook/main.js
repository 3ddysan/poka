const path = require('node:path');
const { mergeConfig } = require('vite');
const Components = require('unplugin-vue-components/vite');
const AutoImport = require('unplugin-auto-import/vite');
const WindiCSS = require('vite-plugin-windicss').default;

module.exports = {
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        Components(),
        AutoImport({
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
  "core": { "builder": "@storybook/builder-vite" },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3"
}