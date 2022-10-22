import { fireEvent, screen } from '@testing-library/vue';
import Plan from '@/pages/plan.vue';
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const render = () => mount(Plan);

describe('Page -> Board', () => {
  beforeEach(() => {
    state.$patch({
      name: 'User',
      users: [
        { name: 'User', voted: true },
        { name: 'AnotherUser', voted: false },
      ],
      vote: '0',
      results: null,
    });
  });

  test('should show user count', () => {
    render();
    expect(screen.getByTestId('user-list-title')).toHaveTextContent(
      'User (' + state.users.length + ')',
    );
  });

  test('should show user list', () => {
    render();
    expect(
      screen.getAllByTestId('user-list-entry').map((el) => el.textContent),
    ).toEqual(expect.arrayContaining(['User✓', 'AnotherUser×']));
  });

  test('should show disabled results action', () => {
    render();
    expect(screen.getByTestId('user-list-results-action')).toBeDisabled();
  });

  test('should show results action', () => {
    state.$patch({
      users: [
        { name: 'User', voted: true },
        { name: 'AnotherUser', voted: true },
      ],
    });
    render();
    expect(screen.getByTestId('user-list-results-action')).toBeEnabled();
  });

  test('should show restart action', () => {
    state.$patch({ results: { '0': 1 } });
    render();
    expect(screen.getByTestId('user-list-restart-action')).toBeEnabled();
  });

  test('should show logout action', () => {
    render();
    expect(screen.getByTestId('user-list-logout-action')).not.toBeDisabled();
  });

  test('should cleanup state after logout action', async () => {
    render();

    await fireEvent.click(screen.getByTestId('user-list-logout-action'));

    expect(state.logout).toHaveBeenCalled();
  });
});
