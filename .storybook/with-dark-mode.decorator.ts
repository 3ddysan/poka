import { ref, watch } from 'vue';
import type { Decorator } from '@storybook/vue3';

export const DEFAULT_THEME = 'light';
const theme = ref(DEFAULT_THEME);

export const withDarkMode: Decorator = (story, context) => {
  theme.value = context.globals.theme || DEFAULT_THEME;
  return {
    name: 'ThemeDecorator',
    components: { story },
    setup() {
      watch(
        theme,
        () => {
          if (theme.value === DEFAULT_THEME) {
            document.documentElement.classList.remove('dark');
          } else if (theme.value === 'dark') {
            document.documentElement.classList.add('dark');
          }
        },
        { immediate: true },
      );
      return {
        theme,
      };
    },
    template: `<story />`,
  };
};
