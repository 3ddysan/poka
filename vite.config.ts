import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';
import Inspect from 'vite-plugin-inspect';

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
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      imports: ['vue', 'vue-router'],
    }),
    Pages(),
    WindiCSS(),
    Inspect(),
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
  },
});
