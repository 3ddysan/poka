import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFetch } from '@vueuse/core';

export interface User {
  name: string;
  vote: string;
  voted: boolean;
}

export type Results = Record<string, number> | null;

export interface UserState {
  name: string;
  vote: string;
  users: User[];
  results: Results;
}

export const useStateStore = defineStore({
  id: 'state',
  sse: ['state'],
  state: () =>
    <UserState>{
      name: '',
      users: [],
      vote: '',
      results: null,
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
  },
  actions: {
    state(stateMessage: string) {
      const { users, results } = JSON.parse(stateMessage);
      if (this.results != null && results == null) {
        this.vote = '';
      }
      this.users = users;
      this.results = results;
    },
    setName(name: string) {
      this.name = name;
      if (name) {
        this.connect(`/api/events?name=${name}`);
      } else {
        this.disconnect();
      }
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
    logout() {
      this.disconnect();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateStore, import.meta.hot));
}
