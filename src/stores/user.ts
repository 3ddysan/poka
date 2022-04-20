import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFetch } from '@vueuse/core';

export interface User {
  name: string;
  voted: boolean;
}

export interface UserState {
  name: string;
  vote: string | null;
  userList: User[];
  voteResults: Record<string, number> | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore({
  id: 'user',
  sse: ['users', 'results', 'reset'],
  state: () =>
    <UserState>{
      name: '',
      vote: null,
      userList: [],
      voteResults: null,
    },
  actions: {
    setName(name: string) {
      this.name = name;
      if (name) {
        this.connect(`${API_URL}/events?name=${name}`);
      } else {
        this.disconnect();
      }
    },
    async setVote(value: string) {
      const vote = this.vote === value ? '' : value;
      await useFetch(`${API_URL}/vote`, {
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
      await useFetch(`${API_URL}/results`);
    },
    async resetResults() {
      await useFetch(`${API_URL}/results`).delete();
    },
    users(usersMessage: string) {
      this.userList = JSON.parse(usersMessage);
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
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
