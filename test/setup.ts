import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import { createI18n } from 'vue-i18n';

vi.mock('@vueuse/core', async () => {
  const actual = (await vi.importActual('@vueuse/core')) as object;
  return {
    ...actual,
    useLocalStorage: vi.fn((key, defaultValue) => ref(defaultValue)),
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
  };
});

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
      stubs: {
        VDropdown: {
          props: ['shown'],
          template: '<div><slot v-if="shown" name="popper" /><slot /></div>',
        },
        VMenu: '<div><slot name="popper" /><slot /></div>',
      },
      ...global,
    },
    ...options,
  });

function Audio(url: string) {
  // ignore
}
Audio.prototype.play = vi.fn();
vi.stubGlobal('Audio', Audio);
