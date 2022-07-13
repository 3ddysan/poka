import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFetch } from '@vueuse/core';
import { useUserStore } from './user';

export type Results = Record<string, number> | null;

export interface VoteState {
  vote: string | null;
  voteResults: Results;
}

const API_URL = import.meta.env.VITE_API_URL;
const user = useUserStore();

export const useVoteStore = defineStore({
  id: 'vote',
  sse: ['results', 'reset'],
  state: () =>
    <VoteState>{
      vote: null,
      voteResults: null,
    },
  getters: {
    highestVote: (state) =>
      state.voteResults == null
        ? ''
        : Object.keys(state.voteResults).reduce(
            (prev: string, current: string) =>
              (state.voteResults?.[prev] ?? 0) >
              (state.voteResults?.[current] ?? 0)
                ? prev
                : current,
            '',
          ),
  },
  actions: {
    async setVote(value: string) {
      const vote = this.vote === value ? '' : value;
      await useFetch(`${API_URL}/vote`, {
        afterFetch: (ctx) => {
          this.vote = vote;
          return ctx;
        },
      }).post({
        name: user.name,
        vote,
      });
    },
    async showResults() {
      await useFetch(`${API_URL}/results`);
    },
    async resetResults() {
      await useFetch(`${API_URL}/results`).delete();
    },
    results(resultsMessage: string) {
      this.voteResults = JSON.parse(resultsMessage);
    },
    reset() {
      this.vote = '';
      this.voteResults = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVoteStore, import.meta.hot));
}
