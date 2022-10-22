<script lang="ts" setup>
import type { User } from '@/stores/state';
import type { PropType } from 'vue';
type Mode = 'results' | 'voting' | 'ready';
const props = defineProps({
  userName: {
    type: String,
    default: '',
  },
  users: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  mode: {
    type: String as PropType<Mode>,
    default: 'voting',
  },
});
defineEmits(['show-results', 'reset-results', 'logout']);
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
          class="flex"
          data-testid="user-list-entry"
          v-for="{ name, voted, vote } in users"
          :key="name"
        >
          <span
            :class="{ 'font-bold': userName === name }"
            class="user-list-entry-name truncate flex-grow"
            :title="name"
            >{{ name }}</span
          >
          <span>{{ mode === 'results' ? vote : voted ? '✓' : '×' }}</span>
        </li>
      </ul>
    </div>
    <div class="flex space-x-2 justify-around mt-4">
      <button
        v-if="mode === 'results'"
        key="restart"
        data-testid="user-list-restart-action"
        class="btn"
        @click="$emit('reset-results')"
      >
        Restart
      </button>
      <button
        v-else
        key="results"
        data-testid="user-list-results-action"
        class="btn"
        @click="$emit('show-results')"
        :disabled="mode !== 'ready'"
      >
        Results
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
  </div>
</template>

<style scoped>
.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded disabled:(bg-gray-200 text-gray-500 shadow-none);
}
.user-list-entry-name {
  max-width: 200px;
}
</style>
