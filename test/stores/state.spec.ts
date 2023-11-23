import { useFetch } from '@vueuse/core';
import { createPinia, setActivePinia } from 'pinia';
import {
  NO_VOTE,
  VOTE,
  buildSpectator,
  buildUser,
  buildUsers,
  mockIsNameTaken,
} from '../fixtures';
import { useStore } from '@/stores/state';

vi.mock('@vueuse/core', async () => (await import('../mocks')).vueuseModule());

const sseMock = {
  connect: vi.fn(),
  disconnect: vi.fn(),
  connected: ref(false),
};
vi.mock('@/composables/sse', () => ({
  useSSE: () => sseMock,
}));

describe('State Store', () => {
  const routerMock = {
    push: vi.fn(() => Promise.resolve()),
  };
  beforeEach(() => {
    const pinia = createPinia();
    // @ts-expect-error ignore partial mock
    pinia.router = routerMock;
    setActivePinia(pinia);
  });

  test('should not login without valid name', async () => {
    const store = useStore();
    await store.login('', false);
    expect(sseMock.connect).not.toHaveBeenCalled();
  });

  test('should login', async () => {
    mockIsNameTaken();
    const store = useStore();
    const name = 'test';

    await store.login(name, false);

    expect(sseMock.connect).toHaveBeenCalled();
    expect(store.name).toEqual(name);
  });

  test('should try login and handle error', async () => {
    const store = useStore();
    sseMock.connect.mockRejectedValueOnce(new Error('ignore'));

    await store.login('ignore', false);

    expect(store.error).toBeTruthy();
  });

  test('should logout and reset state', () => {
    const store = useStore();
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
    const store = useStore();
    store.setVote(VOTE);

    expect(store.vote).toEqual(VOTE);
  });

  test('should unset vote', () => {
    const store = useStore();
    store.vote = VOTE;

    store.setVote(VOTE);

    expect(store.vote).toEqual(NO_VOTE);
  });

  test('should calc highest voted result', () => {
    const store = useStore();
    store.results = { ANOTHER: 1, [VOTE]: 2, YET_ANOTHER: 1 };

    expect(store.highestVote).toEqual(VOTE);
  });

  test('should show fallback vote without results', () => {
    const store = useStore();
    store.results = null;

    expect(store.highestVote).toEqual(NO_VOTE);
  });

  test('should seperate spectators from voters', () => {
    const store = useStore();
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
    const store = useStore();
    expect(store.mode).toEqual('login');
  });

  test('should be in "results" mode', () => {
    const store = useStore();
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
    const store = useStore();
    store.$patch({
      name: 'user',
      users,
    });

    expect(store.mode).toEqual('voting');
  });

  test('should be in "ready" mode', () => {
    const store = useStore();
    store.$patch({
      name: 'user',
      users: buildUsers(true, 2),
    });

    expect(store.mode).toEqual('ready');
  });

  test('should trigger showing results', async () => {
    const store = useStore();
    await store.showResults();

    expect(useFetch).toHaveBeenCalledWith('/api/results');
  });

  test('should trigger hiding results', async () => {
    const store = useStore();

    await store.resetResults();

    expect(useFetch).toHaveBeenCalledWith('/api/results');
  });

  test.each([
    [true, '/plan'],
    [false, '/'],
  ])('should connected=%s route to %s', (isConnected, route) => {
    sseMock.connected.value = isConnected;
    useStore();

    expect(routerMock.push).toHaveBeenCalledWith(route);
  });
});
