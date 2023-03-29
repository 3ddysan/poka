import { fireEvent, type RenderOptions } from '@testing-library/vue';
import UserList from '@/components/UserList.vue';
import {
  buildUsers,
  buildUser,
  buildSpectator,
  VOTE,
  NO_VOTE,
} from 'test/fixtures';

const render = (options?: RenderOptions) => mount(UserList, options);

describe('UserList', () => {
  test.each([
    ['×', buildUsers()],
    ['✓', buildUsers(true)],
    ['-', [buildSpectator()]],
  ])('should render list with votes %s', (voted, users) => {
    const { getByTestId, getAllByTestId } = render({
      props: {
        users,
        mode: 'voting',
      },
    });

    expect(getByTestId('user-list-title')).toHaveTextContent(
      `User (${users.length})`,
    );
    const entries = getAllByTestId('user-list-entry');
    entries.forEach((entry, i) => {
      expect(entry).toHaveTextContent(`${users[i].name}${voted}`);
    });
    expect(entries).toHaveLength(users.length);
  });

  test('should render actions for pending voting', () => {
    const { getByTestId, queryByTestId } = render({
      props: {
        users: buildUsers(),
        mode: 'voting',
      },
    });

    expect(getByTestId('user-list-results-action')).toBeDisabled();
    expect(queryByTestId('user-list-restart-action')).toBeNull();
    expect(getByTestId('user-list-logout-action')).toBeVisible();
  });

  test('should render result action for finished voting', () => {
    const { getByTestId } = render({
      props: {
        users: buildUsers(true),
        mode: 'ready',
      },
    });

    expect(getByTestId('user-list-results-action')).toBeEnabled();
  });

  test('should render actions for finished voting', () => {
    const { getByTestId, queryByTestId } = render({
      props: {
        users: buildUsers(true),
        mode: 'results',
      },
    });

    expect(queryByTestId('user-list-results-action')).toBeNull();
    expect(getByTestId('user-list-restart-action')).toBeVisible();
    expect(getByTestId('user-list-logout-action')).toBeVisible();
  });

  test('should show voting results including missing votes', () => {
    const { getAllByTestId } = render({
      props: {
        users: [buildUser(1, NO_VOTE), buildUser(2, VOTE)],
        mode: 'results',
      },
    });
    const votes = getAllByTestId('user-list-entry-vote');
    expect(votes[0]).toHaveTextContent('×');
    expect(votes[1]).toHaveTextContent(VOTE);
  });

  test.each([['results'], ['voting'], ['ready']])(
    'should kick other user in %s mode',
    async (mode) => {
      const currentUser = buildUser(1);
      const otherUser = buildUser(2);
      const { getAllByTestId } = render({
        props: {
          userName: currentUser.name,
          users: [currentUser, otherUser],
          mode,
        },
      });
      const [me, other] = getAllByTestId('user-list-entry');

      await fireEvent.mouseOver(me);
      expect(me).not.toHaveTextContent(`Remove ${currentUser.name}?`);
      await fireEvent.mouseLeave(me);

      await fireEvent.mouseOver(other);
      expect(other).toHaveTextContent(`Remove ${otherUser.name}?`);
      await fireEvent.mouseLeave(other);
      expect(other).not.toHaveTextContent(`Remove ${otherUser.name}?`);
    },
  );
});
