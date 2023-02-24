import { defineStore, acceptHMRUpdate, getActivePinia } from 'pinia';
import type { StoreState } from '@/types';
import { StateValidator } from '@/validation';
import { useSSE } from '@/composables/sse';
import { useSound } from '@/composables/sound';

const previousName = useLocalStorage('poka_name', '');
const spectate = useLocalStorage('poka_spectator', false);

export const useStore = defineStore('state', () => {
  const { connect, disconnect, connected } = useSSE();
  const { play } = useSound();
  const router = getActivePinia()?.router;
  watch(
    connected,
    async (isConnected) => {
      await router?.push(isConnected ? '/plan' : '/');
    },
    { immediate: true },
  );
  const state = reactive<StoreState>({
    name: '',
    users: [],
    vote: '',
    results: null,
    error: false,
  });
  const voters = computed(() =>
    state.users.filter(({ spectate }) => !spectate),
  );
  return {
    ...toRefs(state),
    highestVote: computed(() =>
      state.results == null
        ? ''
        : Object.keys(state.results).reduce(
            (prev: string, current: string) =>
              (state.results?.[prev] ?? 0) > (state.results?.[current] ?? 0)
                ? prev
                : current,
            '',
          ),
    ),
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
    async isNameTaken(name: string) {
      const { statusCode } = await useFetch(
        `/api/users/${encodeURIComponent(name)}`,
      );
      return statusCode.value === 204;
    },
    async login(name: string, isSpectator: boolean) {
      if (!name) return;
      try {
        state.error = false;
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
        state.error = true;
      }
    },
    connected,
    logout() {
      disconnect();
      state.name = '';
      state.vote = '';
      play('logout');
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
