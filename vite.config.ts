import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';
import Inspect from 'vite-plugin-inspect';
import { VitePWA } from 'vite-plugin-pwa';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            res.on('close', () => {
              if (!res.writableEnded) {
                proxyRes.destroy();
              }
            });
            proxyRes.on('close', () => {
              res.destroy();
            });
          });
        },
      },
    },
  },
  plugins: [
    mkcert(),
    vue(),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [IconsResolver()],
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
    }),
    Pages(),
    WindiCSS(),
    Inspect(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Poka',
        short_name: 'Poka',
        description: 'Agile Planning Poker',
        theme_color: '#e5e7eb',
      },
    }),
    VueI18n({
      defaultSFCLang: 'yml',
    }),
    Icons(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['test/setup.ts'],
    clearMocks: true,
  },
});
