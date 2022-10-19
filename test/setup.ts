import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render, type RenderOptions } from '@testing-library/vue';

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
global.mount = (component: unknown, options: RenderOptions) =>
  render(component, {
    global: {
      plugins: [pinia],
    },
    ...options,
  });
