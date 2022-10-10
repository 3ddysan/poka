import { defineStore, acceptHMRUpdate } from 'pinia';

export interface User {
  name: string;
  voted: boolean;
}

export interface UserState {
  name: string;
  userList: User[];
}

export const useUserStore = defineStore({
  id: 'user',
  sse: ['users'],
  state: () =>
    <UserState>{
      name: '',
      userList: [],
    },
  actions: {
    setName(name: string) {
      this.name = name;
      if (name) {
        this.connect(`/api/events?name=${name}`);
      } else {
        this.disconnect();
      }
    },
    users(usersMessage: string) {
      this.userList = JSON.parse(usersMessage);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
