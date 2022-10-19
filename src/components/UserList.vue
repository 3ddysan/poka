<script lang="ts" setup>
import type { User } from '@/stores/user';
import type { PropType } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    default: '',
  },
  users: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  showResultAction: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['show-results', 'reset-results', 'logout']);
const votingNotFinished = computed(
  () => props.users.length === 1 || props.users.some(({ voted }) => !voted),
);
</script>

<template>
  <div class="py-4 px-8 bg-light-200 shadow-lg rounded-md">
    <div>
      <h2
        data-testid="user-list-title"
        class="text-gray-800 font-semibold text-center"
      >
        User ({{ users.length }})
      </h2>
      <ul class="mt-2 text-gray-600">
        <li
          data-testid="user-list-entry"
          v-for="{ name, voted } in users"
          :key="name"
        >
          <span :class="{ 'font-bold': userName === name }">{{ name }}</span>
          {{ voted ? '✓' : '×' }}
        </li>
      </ul>
    </div>
    <button
      v-if="showResultAction"
      key="results"
      data-testid="user-list-results-action"
      class="btn mr-2 mt-4"
      @click="$emit('show-results')"
      :disabled="votingNotFinished"
    >
      Results
    </button>
    <button
      v-else
      key="restart"
      data-testid="user-list-restart-action"
      class="btn mr-2 mt-4"
      @click="$emit('reset-results')"
    >
      Restart
    </button>
    <button
      key="logout"
      data-testid="user-list-logout-action"
      class="btn"
      @click="$emit('logout')"
    >
      Logout
    </button>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded disabled:(bg-gray-200 text-gray-500 shadow-none);
}
</style>
