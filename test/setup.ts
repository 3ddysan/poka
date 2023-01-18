import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import { createI18n } from 'vue-i18n';

vi.mock('@vueuse/core', () => ({
  useLocalStorage: vi.fn(() => ref(null)),
  useFetch: vi.fn((url, options) => {
    return {
      post() {
        options.afterFetch();
      },
      delete() {
        return Promise.resolve();
      },
      statusCode: ref(204),
    };
  }),
}));

const pinia = createTestingPinia();
setActivePinia(pinia);

// @ts-expect-error type
global.mount = (component: unknown, { global, ...options } = {}) =>
  render(component, {
    global: {
      plugins: [
        pinia,
        createI18n({
          legacy: false,
          locale: 'en',
          messages: {
            en: {},
            de: {},
          },
        }),
      ],
      ...global,
    },
    ...options,
  });
