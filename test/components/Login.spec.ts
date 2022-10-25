import { type RenderOptions, fireEvent, screen } from '@testing-library/vue';
import Login from '@/components/Login.vue';

const render = (options?: RenderOptions) => mount(Login, options);

describe('Login', () => {
  const name = 'anon';

  test('should login', async () => {
    const { emitted } = render();
    await fireEvent.update(screen.getByTestId('login-name'), name);
    await fireEvent.click(screen.getByTestId('login-action'));
    expect(emitted().login).toEqual([[name]]);
  });

  test('should login on enter', async () => {
    const { emitted } = render();
    await fireEvent.update(screen.getByTestId('login-name'), name);
    await fireEvent.keyDown(screen.getByTestId('login-name'), { key: 'Enter' });
    expect(emitted().login).toEqual([[name]]);
  });

  test('should spectate', async () => {
    const { emitted } = render();
    await fireEvent.update(screen.getByTestId('login-name'), name);
    await fireEvent.click(screen.getByTestId('spectate-action'));
    expect(emitted().spectate).toEqual([[name]]);
  });

  test.each(['  ', ''])(
    'should not accept invalid name (%#)',
    async (invalidName) => {
      const { emitted } = render();
      await fireEvent.update(screen.getByTestId('login-name'), invalidName);
      await fireEvent.click(screen.getByTestId('login-action'));
      expect(emitted().login).toBeUndefined();
    },
  );

  test('should trim name', async () => {
    const { emitted } = render();
    await fireEvent.update(screen.getByTestId('login-name'), `  ${name} `);
    await fireEvent.click(screen.getByTestId('login-action'));
    expect(emitted().login).toEqual([[name]]);
  });

  test('should show error', async () => {
    const errorMessage = 'error';
    render({
      props: {
        errorMessage,
      },
    });
    expect(screen.getByTestId('login-error')).toHaveTextContent(errorMessage);
  });

  test('should render disabled', async () => {
    render({
      props: {
        disabledAction: true,
      },
    });
    expect(screen.getByTestId('login-action')).toBeDisabled();
  });
});
