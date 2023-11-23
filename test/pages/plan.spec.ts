import { fireEvent, screen } from '@testing-library/vue';
import { NO_VOTE, VOTE, buildSpectator, buildUser } from '../fixtures';
import Plan from '@/pages/plan.vue';
import { useStore } from '@/stores/state';

const state = useStore();
const render = () => mount(Plan);

const getCard = () =>
  screen
    .getAllByTestId('card-value')
    .find(({ textContent }) => textContent === VOTE);

describe('Page -> Board', () => {
  beforeEach(() => {
    state.$patch({
      name: 'User',
      users: [buildUser('User', VOTE), buildUser('AnotherUser', NO_VOTE)],
      vote: '0',
      results: null,
    });
  });

  test('should vote', async () => {
    render();

    // @ts-expect-error type
    await fireEvent.click(getCard());

    expect(state.setVote).toHaveBeenCalledWith(VOTE);
  });

  test('should not allow voting for spectator', async () => {
    state.$patch({
      users: [buildSpectator()],
    });
    // @ts-expect-error testing purpose
    state.spectate = true;
    render();

    // @ts-expect-error type
    await fireEvent.click(getCard());

    expect(state.setVote).not.toHaveBeenCalledWith(VOTE);
  });

  test('should show user count', () => {
    render();
    expect(screen.getByTestId('user-list-title')).toHaveTextContent(
      `User (${state.users.length})`,
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
      users: [buildUser('User', VOTE), buildUser('AnotherUser', VOTE)],
    });
    render();
    expect(screen.getByTestId('user-list-results-action')).toBeEnabled();
  });

  test('should show restart action', () => {
    state.$patch({ results: { [VOTE]: 1 } });
    render();
    expect(screen.getByTestId('user-list-restart-action')).toBeEnabled();
  });

  test('should show logout action', () => {
    render();
    expect(screen.getByTestId('user-list-logout-action')).toBeEnabled();
  });

  test('should logout', async () => {
    render();

    await fireEvent.click(screen.getByTestId('user-list-logout-action'));

    expect(state.logout).toHaveBeenCalled();
  });
});
