import {
  type RenderOptions,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/vue';
import Index from '@/pages/index.vue';
import { useStateStore } from '@/stores/state';

const USERNAME = 'anon';
const STORED_USERNAME = 'previous name';
const state = useStateStore();
const render = (options?: RenderOptions) => mount(Index, options);

const login = async (name = USERNAME) => {
  await fireEvent.update(screen.getByTestId('login-name'), name);
  await fireEvent.click(screen.getByTestId('login-action'));
};
describe('Index', () => {
  beforeEach(() => {
    state.$patch({
      name: '',
    });
  });

  test('should login', async () => {
    render();
    await login();
    expect(state.login).toHaveBeenCalledWith(USERNAME, false);
  });

  test('should show name error', async () => {
    vi.mocked(state.isNameTaken).mockReturnValueOnce(Promise.resolve(true));
    render();

    await login();

    expect(state.login).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByTestId('login-error')).toHaveTextContent(
        'Please, choose a different name!',
      ),
    );
  });

  test('should show server error', async () => {
    vi.mocked(state.isNameTaken).mockReturnValueOnce(Promise.resolve(false));
    vi.mocked(state.login).mockImplementationOnce(async () => {
      state.error = true;
    });
    render();

    await login();

    expect(state.login).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByTestId('login-error')).toHaveTextContent(
        'Server does not responde.',
      ),
    );
  });

  test('should reuse previous name', async () => {
    // @ts-expect-error overwrite getter for testing
    state.previousName = STORED_USERNAME;

    render();

    expect(screen.getByTestId('login-name')).toHaveValue(STORED_USERNAME);
  });
});
