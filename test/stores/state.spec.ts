import { useStore } from '@/stores/state';
import {
  buildSpectator,
  buildUser,
  buildUsers,
  NO_VOTE,
  VOTE,
} from 'test/fixtures';
import { useFetch } from '@vueuse/core';
import { setActivePinia, createPinia } from 'pinia';

const sseMock = {
  connect: vi.fn(),
  disconnect: vi.fn(),
  connected: ref(false),
};
vi.mock('@/plugins/sse', () => ({
  useSSE: () => sseMock,
}));
// vi.mocked(useSSE).mockImplementation(() => {default: () => sseMock});

describe('State Store', () => {
  let store: ReturnType<typeof useStore>;
  beforeEach(() => {
    store = useStore();
    setActivePinia(createPinia());
  });

  test('should not login without valid name', async () => {
    await store.login('', false);
    expect(sseMock.connect).not.toHaveBeenCalled();
  });

  test('should login', async () => {
    const name = 'test';

    await store.login(name, false);

    expect(sseMock.connect).toHaveBeenCalled();
    expect(store.name).toEqual(name);
  });

  test('should try login and handle error', async () => {
    sseMock.connect.mockRejectedValueOnce(new Error());

    await store.login('ignore', false);

    expect(store.error).toBeTruthy();
  });

  test('should logout and reset state', async () => {
    store.$patch({
      name: 'test',
      vote: VOTE,
    });

    store.logout();

    expect(sseMock.disconnect).toHaveBeenCalled();
    expect(store.name).toEqual('');
    expect(store.vote).toEqual('');
  });

  test('should set vote', () => {
    store.setVote(VOTE);

    expect(store.vote).toEqual(VOTE);
  });

  test('should unset vote', () => {
    store.vote = VOTE;

    store.setVote(VOTE);

    expect(store.vote).toEqual(NO_VOTE);
  });

  // test('should receive state event', () => {
  //   const user = {
  //     name: 'user',
  //     vote: '',
  //     voted: false,
  //     spectate: false,
  //   };
  //   const results = {
  //     VOTE: 1,
  //   };
  //   state.vote = VOTE;

  //   state.state(
  //     JSON.stringify({
  //       users: [user],
  //       results,
  //     }),
  //   );

  //   expect(state.users).toEqual([user]);
  //   expect(state.results).toEqual(results);
  // });

  test('should calc highest voted result', () => {
    store.results = { ANOTHER: 1, [VOTE]: 2, YET_ANOTHER: 1 };

    expect(store.highestVote).toEqual(VOTE);
  });

  test('should show fallback vote without results', () => {
    store.results = null;

    expect(store.highestVote).toEqual(NO_VOTE);
  });

  test('should seperate spectators from voters', () => {
    const voter = buildUser();

    store.users = [buildSpectator(), voter];

    expect(store.voters).toEqual([voter]);
  });

  // test('should reset current vote if state event resets results', () => {
  //   store.$patch({
  //     vote: VOTE,
  //     results: { ANOTHER: 1, [VOTE]: 2, YET_ANOTHER: 1 },
  //   });

  //   store.state(
  //     JSON.stringify({
  //       users: [],
  //       results: null,
  //     }),
  //   );

  //   expect(store.vote).toEqual(NO_VOTE);
  // });

  test('should be initially in "login" mode', () => {
    expect(store.mode).toEqual('login');
  });

  test('should be in "results" mode', () => {
    store.$patch({
      name: 'user',
      results: {},
    });

    expect(store.mode).toEqual('results');
  });

  test.each([
    [[buildSpectator()]],
    [[buildUser(1, VOTE)]],
    [[buildUser(1, VOTE), buildUser(2, NO_VOTE)]],
  ])('should be in "voting" mode %#', (users) => {
    store.$patch({
      name: 'user',
      users,
    });

    expect(store.mode).toEqual('voting');
  });

  test('should be in "ready" mode', () => {
    store.$patch({
      name: 'user',
      users: buildUsers(true, 2),
    });

    expect(store.mode).toEqual('ready');
  });

  test('should trigger showing results', async () => {
    await store.showResults();

    expect(useFetch).toHaveBeenCalledWith('/api/results');
  });

  test('should trigger hiding results', async () => {
    await store.resetResults();

    expect(useFetch).toHaveBeenCalledWith('/api/results');
  });

  test.each([
    [204, 'toBeTruthy'],
    [404, 'toBeFalsy'],
  ])(
    'should check name availability (http %s)',
    async (statusCode, matcherName) => {
      vi.mocked(useFetch, { partial: true }).mockReturnValueOnce({
        statusCode: ref(statusCode),
      });
      const name = 'new_user';

      const isTaken = await store.isNameTaken(name);

      expect(useFetch).toHaveBeenCalledWith(`/api/users/${name}`);
      expect(isTaken)[matcherName]();
    },
  );
});
