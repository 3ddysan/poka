<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const values = ['0', '1', '2', '3', '5', '8', '13', '20', '?', '☕'];
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
  <div
    class="grid <sm:grid-cols-3 sm:grid-cols-4 grid-rows-4 gap-5 lg:max-w-1/2"
  >
    <Card
      v-for="value in values"
      :key="value"
      :selected="user.vote === value"
      :votes="user.voteResults?.[value] ?? 0"
      :mark="highestVote === value"
      :disabled="user.voteResults != null"
      @click="user.setVote(value)"
      >{{ value }}</Card
    >
  </div>
</template>
