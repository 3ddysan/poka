<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const votingNotFinished = computed(() =>
  user.userList.some(({ voted }) => !voted),
);
const highestVote = computed(() =>
  user.voteResults == null
    ? ''
    : Object.keys(user.voteResults).reduce((prev: string, current: string) => {
        console.log(user.voteResults?.[prev], user.voteResults?.[current]);
        return (user.voteResults?.[prev] ?? 0) >
          (user.voteResults?.[current] ?? 0)
          ? prev
          : current;
      }, ''),
);
</script>

<template>
  <Layout>
    <template #sidebar>
      <UserList
        :disabled-result-action="votingNotFinished"
        :show-result-action="user.voteResults == null"
        :user-name="user.name"
        :users="user.userList"
        @show-results="user.showResults()"
        @reset-results="user.resetResults()"
        @logout="user.disconnect()"
      />
    </template>
    <template #main>
      <Board
        :disabled="user.voteResults != null"
        :marked="highestVote"
        :selected="user.vote"
        :results="user.voteResults"
        @update:selected="user.setVote($event)"
      />
    </template>
  </Layout>
</template>
