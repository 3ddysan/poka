import { defineStore, acceptHMRUpdate, getActivePinia } from 'pinia';
import type { StoreState } from '@/types';
import { StateValidator } from '@/validation';
import { useSSE } from '@/composables/sse';
import { useSound } from '@/composables/sound';
import { useIntervalFnInBackground } from '@/composables/detector';
import { values } from '@/components/Board.vue';

const previousName = useLocalStorage('poka_name', '');
const spectate = useLocalStorage('poka_spectator', false);

export const useStore = defineStore('state', () => {
  const state = reactive<StoreState>({
    name: '',
    users: [],
    vote: '',
    results: null,
    error: null,
  });
  const { connect, disconnect, connected } = useSSE();
  const { play } = useSound();
  const checkUser = async (name: string, path = '') => {
    const { statusCode } = await useFetch(
      `/api/users/${encodeURIComponent(name)}${path}`,
    );
    return statusCode.value === 204;
  };
  const logout = () => {
    disconnect();
    state.name = '';
    state.vote = '';
    play('logout');
  };
  const { resume, pause } = useIntervalFnInBackground(async () => {
    if (!(await checkUser(state.name, '/status'))) {
      logout();
    }
  });
  const router = getActivePinia()?.router;
  watch(
    connected,
    async (isConnected) => {
      if (isConnected) resume();
      else pause();
      await router?.push(isConnected ? '/plan' : '/');
    },
    { immediate: true },
  );
  const voters = computed(() =>
    state.users.filter(({ spectate }) => !spectate),
  );
  return {
    ...toRefs(state),
    highestVote: computed(() => {
      const results = state.results;
      if (results == null) return '';
      const i = values.reduce((prev, current, index, keys) => {
        const prev_votes = results[keys[prev]] ?? 0;
        const current_votes = results[current] ?? 0;
        if (current_votes >= prev_votes) return index;
        else return prev;
      }, 0);
      return values[i] in results ? values[i] : '';
    }),
    voters,
    mode: computed(() => {
      if (!state.name) return 'login';
      if (state.results != null) return 'results';
      if (voters.value.length <= 1 || voters.value.some(({ voted }) => !voted))
        return 'voting';
      return 'ready';
    }),
    previousName: computed(() => previousName.value),
    spectate: computed(() => spectate.value),
    async setVote(value: string) {
      const vote = state.vote === value ? '' : value;
      if (vote) {
        play('select');
      } else {
        play('deselect');
      }
      await useFetch('/api/vote', {
        afterFetch: (ctx) => {
          state.vote = vote;
          return ctx;
        },
      }).post({
        name: state.name,
        vote,
      });
    },
    async showResults() {
      await useFetch('/api/results');
    },
    async resetResults() {
      await useFetch('/api/results').delete();
    },
    async login(name: string, isSpectator: boolean) {
      if (!name) return;
      try {
        state.error = null;
        if (await checkUser(name)) {
          state.error = 'name';
          play('error');
          return;
        }
        await connect(
          `/api/events?name=${encodeURIComponent(
            name,
          )}&spectate=${isSpectator}`,
          {
            state(message: string) {
              const { users, results } = StateValidator.parse(
                JSON.parse(message),
              );
              if (state.results != null && results == null) {
                state.vote = '';
                play('reset');
              }
              if (state.vote && state.results == null && results != null) {
                play('results');
              }
              state.users = users;
              state.results = results;
            },
          },
        );
        play('login');
        previousName.value = name;
        state.name = name;
        spectate.value = isSpectator;
      } catch (e: unknown) {
        state.error = 'server';
      }
    },
    connected,
    logout,
  };
});

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import.meta.hot.accept(acceptHMRUpdate(useStore as any, import.meta.hot));
}
