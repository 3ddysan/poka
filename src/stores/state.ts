import { z } from 'zod';
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Store } from '@/types';
import { StateValidator } from '@/validation';

const previousName = useLocalStorage('poka', '');

export const useStateStore = defineStore({
  id: 'state',
  sse: ['state'],
  state: () =>
    <Store>{
      name: '',
      users: [],
      vote: '',
      results: null,
      spectate: false,
      error: false,
    },
  getters: {
    highestVote: (state) =>
      state.results == null
        ? ''
        : Object.keys(state.results).reduce(
            (prev: string, current: string) =>
              (state.results?.[prev] ?? 0) > (state.results?.[current] ?? 0)
                ? prev
                : current,
            '',
          ),
    voters: (state) => state.users.filter(({ spectate }) => !spectate),
    mode(state) {
      if (!state.name) return 'login';
      if (state.results != null) return 'results';
      if (this.voters.length <= 1 || this.voters.some(({ voted }) => !voted))
        return 'voting';
      return 'ready';
    },
    previousName: () => previousName.value,
  },
  actions: {
    state(stateMessage: string) {
      const { users, results } = StateValidator.parse(JSON.parse(stateMessage));
      if (this.results != null && results == null) {
        this.vote = '';
      }
      this.users = users;
      this.results = results;
    },
    async setVote(value: string) {
      const vote = this.vote === value ? '' : value;
      await useFetch('/api/vote', {
        afterFetch: (ctx) => {
          this.vote = vote;
          return ctx;
        },
      }).post({
        name: this.name,
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
        this.error = false;
        await this.connect(
          `/api/events?name=${encodeURIComponent(name)}&spectate=${spectate}`,
        );
        previousName.value = name;
        this.$patch({
          name,
          spectate,
        });
      } catch (e: unknown) {
        this.error = true;
      }
    },
    logout() {
      this.disconnect();
      this.$patch({
        name: '',
        spectate: false,
        vote: '',
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateStore, import.meta.hot));
}
