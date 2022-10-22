<script lang="ts" setup>
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const mode = computed(() => {
  if (state.results != null) return 'results';
  if (state.users.length === 1 || state.users.some(({ voted }) => !voted))
    return 'voting';
  return 'ready';
});
</script>

<template>
  <Layout>
    <template #sidebar>
      <UserList
        :mode="mode"
        :user-name="state.name"
        :users="state.users"
        @show-results="state.showResults()"
        @reset-results="state.resetResults()"
        @logout="state.logout()"
      />
    </template>
    <template #main>
      <Board
        :disabled="state.results != null"
        :marked="state.highestVote"
        :selected="state.vote"
        :results="state.results"
        @update:selected="state.setVote($event)"
      />
    </template>
  </Layout>
</template>
