import {
  render as mount,
  type RenderOptions,
  fireEvent,
} from '@testing-library/vue';
import UserList from '@/components/UserList.vue';

const buildUsers = (voted = false) =>
  Array.from({ length: 3 }, (_, i) => ({
    name: `user${i}`,
    voted,
  }));
const render = (options?: RenderOptions) => mount(UserList, options);

describe('UserList', () => {
  test.each([
    ['×', buildUsers()],
    ['✓', buildUsers(true)],
  ])('should render list with votes %s', (voted, users) => {
    const { getByTestId, getAllByTestId } = render({
      props: {
        users,
      },
    });

    expect(getByTestId('user-list-title')).toHaveTextContent(
      `User (${users.length})`,
    );
    const entries = getAllByTestId('user-list-entry');
    entries.forEach((entry, i) => {
      expect(entry).toHaveTextContent(`${users[i].name} ${voted}`);
    });
    expect(entries).toHaveLength(users.length);
  });

  test('should render actions for pending voting', () => {
    const { getByTestId, queryByTestId } = render({
      props: {
        users: buildUsers(),
        showResultAction: true,
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
        showResultAction: true,
      },
    });

    expect(getByTestId('user-list-results-action')).toHaveAttribute(
      'disabled',
      'false',
    );
  });

  test('should render actions for finished voting', () => {
    const { getByTestId, queryByTestId } = render({
      props: {
        users: buildUsers(true),
        showResultAction: false,
      },
    });

    expect(queryByTestId('user-list-results-action')).toBeNull();
    expect(getByTestId('user-list-restart-action')).toBeVisible();
    expect(getByTestId('user-list-logout-action')).toBeVisible();
  });
});
