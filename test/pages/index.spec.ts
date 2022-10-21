import { type RenderOptions, screen, fireEvent } from '@testing-library/vue';
import Index from '@/pages/index.vue';
import { useStateStore } from '@/stores/state';

const state = useStateStore();

describe('Index', () => {
  const focus = vi.fn();
  const name = 'anon';
  const render = (options?: RenderOptions) =>
    mount(Index, {
      global: {
        directives: {
          focus,
        },
      },
      ...options,
    });

  beforeEach(() => {
    state.$patch({
      name: '',
    });
  });

  test('should focus name field', async () => {
    render();
    expect(focus).toHaveBeenCalled();
  });

  test('should login', async () => {
    render();
    await fireEvent.update(screen.getByTestId('login-name'), name);
    await fireEvent.click(screen.getByTestId('login-action'));
    expect(state.login).toHaveBeenCalledWith(name);
  });

  test.each(['  ', ''])(
    'should not accept invalid name (%#)',
    async (invalidName) => {
      render();
      await fireEvent.update(screen.getByTestId('login-name'), invalidName);
      await fireEvent.click(screen.getByTestId('login-action'));
      expect(state.login).not.toHaveBeenCalled();
    },
  );

  test('should trim name', async () => {
    render();
    await fireEvent.update(screen.getByTestId('login-name'), `  ${name} `);
    await fireEvent.click(screen.getByTestId('login-action'));
    expect(state.login).toHaveBeenCalledWith(name);
  });
});
