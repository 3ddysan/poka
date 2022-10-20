<script lang="ts" setup>
import { useStateStore } from '@/stores/state';

const state = useStateStore();
</script>

<template>
  <Layout>
    <template #sidebar>
      <UserList
        :show-result-action="state.results == null"
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
