<script lang="ts" setup>
import { useStore } from '@/stores/state';

const state = useStore();
</script>

<template>
  <Layout>
    <template #sidebar>
      <UserList
        :mode="state.mode"
        :user-name="state.name"
        :users="state.users"
        @show-results="state.showResults()"
        @reset-results="state.resetResults()"
        @logout="state.logout()"
      />
    </template>
    <template #main>
      <Board
        :disabled="state.spectate || state.results != null"
        :marked="state.highestVote"
        :selected="state.vote"
        :results="state.results"
        :values="state.values"
        @update:selected="state.setVote($event)"
      />
    </template>
  </Layout>
</template>
