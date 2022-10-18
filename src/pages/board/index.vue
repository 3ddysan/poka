<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useVoteStore } from '@/stores/vote';

const user = useUserStore();
const vote = useVoteStore();
const logout = () => {
  vote.reset();
  user.disconnect();
};
</script>

<template>
  <Layout>
    <template #sidebar>
      <UserList
        :show-result-action="vote.voteResults == null"
        :user-name="user.name"
        :users="user.userList"
        @show-results="vote.showResults()"
        @reset-results="vote.resetResults()"
        @logout="logout()"
      />
    </template>
    <template #main>
      <Board
        :disabled="vote.voteResults != null"
        :marked="vote.highestVote"
        :selected="vote.vote"
        :results="vote.voteResults"
        @update:selected="vote.setVote($event)"
      />
    </template>
  </Layout>
</template>
