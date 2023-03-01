import { onMounted } from 'vue';

export const DEFAULT_THEME = "light";

export const withDarkMode = (story, context) => {
  const theme = context.globals.theme || DEFAULT_THEME;
  return {
    components: { story },
    setup() {
        onMounted(() => {
            if (theme === DEFAULT_THEME) {
                document.documentElement.classList.remove('dark');
            } else if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        });
      return {
        theme,
      };
    },
    template: `<story />`,
  };
};