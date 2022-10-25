import { setActivePinia, createPinia } from 'pinia';
import { useStateStore } from '@/stores/state';
import { createApp } from 'vue';
import { buildUser } from 'test/fixtures';

vi.mock('@vueuse/core', () => ({
  useFetch: vi.fn((url, options) => {
    return {
      post() {
        options.afterFetch();
      },
    };
  }),
}));

const app = createApp({});
const connect = vi.fn();
const disconnect = vi.fn();
const connected = ref(false);

const VOTE = '1';
const VOTE_EMPTY = '';

describe('State Store', () => {
  beforeEach(() => {
    const pinia = createPinia().use(() => ({
      connect,
      disconnect,
      connected,
    }));
    app.use(pinia);
    setActivePinia(pinia);
  });

  it('should login and set name', async () => {
    const name = 'test';
    const state = useStateStore();
    await state.login(name, false);
    expect(connect).toHaveBeenCalled();
    expect(state.name).toEqual(name);
  });

  it('should logout and reset state', async () => {
    const state = useStateStore();
    state.$patch({
      name: 'test',
      vote: VOTE,
    });

    state.logout();

    expect(disconnect).toHaveBeenCalled();
    expect(state.name).toEqual('');
    expect(state.vote).toEqual('');
  });

  test('should set vote', () => {
    const state = useStateStore();

    state.setVote(VOTE);

    expect(state.vote).toEqual(VOTE);
  });

  test('should unset vote', () => {
    const state = useStateStore();
    state.vote = VOTE;

    state.setVote(VOTE);

    expect(state.vote).toEqual(VOTE_EMPTY);
  });

  test('should receive state event', () => {
    const user = {
      name: 'user',
      vote: '',
      voted: false,
      spectate: false,
    };
    const results = {
      VOTE: 1,
    };
    const state = useStateStore();
    state.vote = VOTE;

    state.state(
      JSON.stringify({
        users: [user],
        results,
      }),
    );

    expect(state.users).toEqual([user]);
    expect(state.results).toEqual(results);
  });

  test('should calc highest voted result', () => {
    const state = useStateStore();

    state.results = { ANOTHER: 1, [VOTE]: 2, YET_ANOTHER: 1 };

    expect(state.highestVote).toEqual(VOTE);
  });

  test('should reset current vote if state event resets results', () => {
    const state = useStateStore();
    state.$patch({
      vote: VOTE,
      results: { ANOTHER: 1, [VOTE]: 2, YET_ANOTHER: 1 },
    });

    state.state(
      JSON.stringify({
        users: [],
        results: null,
      }),
    );

    expect(state.vote).toEqual(VOTE_EMPTY);
  });

  test('should be initially in "login" mode', () => {
    const state = useStateStore();

    expect(state.mode).toEqual('login');
  });

  test('should be in "results" mode', () => {
    const state = useStateStore();
    state.$patch({
      name: 'user',
      results: {},
    });

    expect(state.mode).toEqual('results');
  });

  test.each([[[buildUser(1, '1')]], [[[buildUser(1, '1'), buildUser(2, '')]]]])(
    'should be in "ready" mode %#',
    (users) => {
      const state = useStateStore();
      // @ts-expect-error type
      state.$patch({
        name: 'user',
        users,
      });

      expect(state.mode).toEqual('voting');
    },
  );
});
