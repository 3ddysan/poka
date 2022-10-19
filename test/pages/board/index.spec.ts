import { fireEvent, screen } from '@testing-library/vue';
import Board from '@/pages/board/index.vue';
import { useUserStore } from '@/stores/user';
import { useVoteStore } from '@/stores/vote';

const user = useUserStore();
const vote = useVoteStore();

describe('Page -> Board', () => {
  beforeEach(() => {
    user.$patch({
      name: 'User',
      userList: [
        { name: 'User', voted: true },
        { name: 'AnotherUser', voted: false },
      ],
    });
    vote.$patch({ vote: '0', voteResults: null });
  });

  test('should show user count', () => {
    mount(Board);
    expect(screen.getByTestId('user-list-title')).toHaveTextContent(
      'User (' + user.userList.length + ')',
    );
  });

  test('should show user list', () => {
    mount(Board);
    expect(
      screen.getAllByTestId('user-list-entry').map((el) => el.textContent),
    ).toEqual(expect.arrayContaining(['User ✓', 'AnotherUser ×']));
  });

  test('should show disabled results action', () => {
    mount(Board);
    expect(screen.getByTestId('user-list-results-action')).toBeDisabled();
  });

  test('should show results action', () => {
    user.$patch({
      userList: [
        { name: 'User', voted: true },
        { name: 'AnotherUser', voted: true },
      ],
    });
    mount(Board);
    expect(screen.getByTestId('user-list-results-action')).toBeEnabled();
  });

  test('should show restart action', () => {
    vote.$patch({ voteResults: { '0': 1 } });
    mount(Board);
    expect(screen.getByTestId('user-list-restart-action')).toBeEnabled();
  });

  test('should show logout action', () => {
    mount(Board);
    expect(screen.getByTestId('user-list-logout-action')).not.toBeDisabled();
  });

  test('should cleanup state after logout action', async () => {
    mount(Board);

    await fireEvent.click(screen.getByTestId('user-list-logout-action'));

    expect(vote.reset).toHaveBeenCalled();
    expect(user.disconnect).toHaveBeenCalled();
  });
});
