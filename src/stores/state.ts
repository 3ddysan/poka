import { defineStore, acceptHMRUpdate, getActivePinia } from 'pinia';
import type { StoreState } from '@/types';
import { StateValidator } from '@/validation';
import { useSSE } from '@/plugins/sse';

const previousName = useLocalStorage('poka', '');

export const useStore = defineStore('state', () => {
  const { connect, disconnect, connected } = useSSE();
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
    spectate: false,
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
    async setVote(value: string) {
      const vote = state.vote === value ? '' : value;
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
    async login(name: string, spectate: boolean) {
      if (!name) return;
      try {
        state.error = false;
        await connect(
          `/api/events?name=${encodeURIComponent(name)}&spectate=${spectate}`,
          {
            state(message: string) {
              const { users, results } = StateValidator.parse(
                JSON.parse(message),
              );
              if (state.results != null && results == null) {
                state.vote = '';
              }
              state.users = users;
              state.results = results;
            },
          },
        );
        previousName.value = name;
        state.name = name;
        state.spectate = spectate;
      } catch (e: unknown) {
        state.error = true;
      }
    },
    connected,
    logout() {
      disconnect();
      state.name = '';
      state.spectate = false;
      state.vote = '';
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
