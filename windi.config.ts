import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      screens: {
        vmd: { raw: '(min-width: 768px) and (min-height: 480px)' },
        '<vmd': { raw: '(min-width: 768px) and (max-height: 480px)' },
      },
    },
  },
});
