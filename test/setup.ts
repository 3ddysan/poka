import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';

const pinia = createTestingPinia({
  plugins: [
    ({ options: { sse } }) =>
      sse == null
        ? undefined
        : {
            connect: vi.fn(),
            disconnect: vi.fn(),
            connected: ref(false),
          },
  ],
});
setActivePinia(pinia);

// @ts-expect-error type
global.mount = (component: unknown, { global, ...options } = {}) =>
  render(component, {
    global: {
      plugins: [pinia],
      ...global,
    },
    ...options,
  });
