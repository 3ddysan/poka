import { z } from 'zod';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFetch } from '@vueuse/core';

const User = z.object({
  name: z.string(),
  vote: z.string(),
  voted: z.boolean(),
});
export type User = z.infer<typeof User>;

const Results = z.record(z.string(), z.number()).nullable();
export type Results = z.infer<typeof Results>;

const ServerState = z.object({
  users: z.array(User),
  results: Results,
});
export type ServerState = z.infer<typeof ServerState>;

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
      const { users, results } = ServerState.parse(JSON.parse(stateMessage));
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
    async login(name: string) {
      if (!name) return;
      await this.connect(`/api/events?name=${name}`);
      this.name = name;
    },
    logout() {
      this.disconnect();
      this.name = '';
      this.vote = '';
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateStore, import.meta.hot));
}
