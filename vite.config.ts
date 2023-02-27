import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import WindiCSS from 'vite-plugin-windicss';
import Inspect from 'vite-plugin-inspect';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    VueRouter({
      dts: './src/typed-router.d.ts',
    }),
    ...(mode !== 'test' ? [mkcert()] : []),
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
      imports: ['vue', VueRouterAutoImports, 'vue-i18n', '@vueuse/core'],
    }),
    WindiCSS(),
    Inspect(),
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
}));
