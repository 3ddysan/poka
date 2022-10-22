import { type RenderOptions, screen, fireEvent } from '@testing-library/vue';
import Index from '@/pages/index.vue';
import { useStateStore } from '@/stores/state';

const state = useStateStore();

describe('Index', () => {
  const name = 'anon';
  const render = (options?: RenderOptions) => mount(Index, options);

  beforeEach(() => {
    state.$patch({
      name: '',
    });
  });

  test('should login', async () => {
    render();
    await fireEvent.update(screen.getByTestId('login-name'), name);
    await fireEvent.click(screen.getByTestId('login-action'));
    expect(state.login).toHaveBeenCalledWith(name);
  });
});
