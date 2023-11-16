import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import { createI18n } from 'vue-i18n';
import * as util from 'node:util';

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

const { warn, error } = console;
const ignored = ['ignore', 'deprecated'];
type ConsoleMethod = Console['warn' | 'error'];

const filterIgnored = (
  callback: ConsoleMethod,
  ...args: Parameters<ConsoleMethod>
) => {
  callback(...args);
  const msg = util.format(...args);
  if (
    typeof msg === 'string' &&
    ignored.some((ignoredMsg) => msg.includes(ignoredMsg))
  ) {
    return;
  }
  throw msg;
};

console.warn = (...args) => filterIgnored(warn, ...args);
console.error = (...args) => filterIgnored(error, ...args);
