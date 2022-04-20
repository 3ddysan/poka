<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const votingFinished = computed(() =>
  user.userList.every(({ voted }) => voted),
);
</script>

<template>
  <div class="py-4 px-8 bg-light-200 shadow-lg rounded-md">
    <div>
      <h2 class="text-gray-800 font-semibold text-center">
        User ({{ user.userList.length }})
      </h2>
      <ul class="mt-2 text-gray-600">
        <li v-for="{ name, voted } in user.userList" :key="name">
          <span :class="{ 'font-bold': user.name === name }">{{ name }}</span>
          {{ voted ? '✓' : '×' }}
        </li>
      </ul>
    </div>
    <button
      v-if="user.voteResults == null"
      class="btn mr-2 mt-4"
      @click="user.showResults()"
      :disabled="!votingFinished"
    >
      Results
    </button>
    <button v-else class="btn mr-2 mt-4" @click="user.resetResults()">
      Restart
    </button>
    <button class="btn" @click="user.disconnect()">Logout</button>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded disabled:(bg-gray-200 text-gray-500 shadow-none);
}
</style>
