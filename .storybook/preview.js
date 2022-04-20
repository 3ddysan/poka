import { app } from '@storybook/vue3';
import { createPinia } from 'pinia';
import 'virtual:windi.css';

app.use(createPinia());

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}