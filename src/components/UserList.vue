<script lang="ts" setup>
import type { User } from '@/types';
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
const { t } = useI18n();
</script>

<template>
  <div
    class="py-4 px-8 bg-light-200 dark:bg-[#6a6577] shadow-lg rounded-md min-w-65 max-h-180"
  >
    <div>
      <h2
        data-testid="user-list-title"
        class="text-gray-800 dark:text-[#f8f8f3] font-semibold text-center"
      >
        {{ t('title') }} ({{ users.length }})
      </h2>
      <ul class="mt-2 text-gray-600 dark:text-[#f8f8f3]">
        <li
          class="flex"
          data-testid="user-list-entry"
          v-for="{ name, voted, vote, spectate } in users"
          :key="name"
        >
          <span
            :class="{ 'font-bold': userName === name }"
            data-testid="user-list-entry-name"
            class="user-list-entry-name truncate flex-grow"
            :title="name"
          >
            {{ name }}
          </span>
          <span class="w-4" data-testid="user-list-entry-vote">{{
            voted ? (mode === 'results' ? vote : '✓') : spectate ? '-' : '×'
          }}</span>
        </li>
      </ul>
    </div>
    <div class="flex space-x-2 justify-around mt-4">
      <Btn
        v-if="mode === 'results'"
        key="restart"
        dense
        data-testid="user-list-restart-action"
        @click="$emit('reset-results')"
      >
        <i-mdi-restart /> {{ t('restart') }}
      </Btn>
      <Btn
        v-else
        key="results"
        dense
        data-testid="user-list-results-action"
        @click="$emit('show-results')"
        :disabled="mode !== 'ready'"
      >
        <i-mdi-vote /> {{ t('results') }}
      </Btn>
      <Btn
        key="logout"
        dense
        data-testid="user-list-logout-action"
        @click="$emit('logout')"
      >
        <i-mdi-logout /> {{ t('logout') }}
      </Btn>
    </div>
  </div>
</template>

<style scoped>
.user-list-entry-name {
  max-width: 200px;
}
</style>

<i18n>
en:
  title: 'User'
  logout: 'Logout'
  results: 'Result'
  restart: 'Restart'
de:
  title: 'Benutzer'
  logout: 'Abmelden'
  results: 'Ergebnis'
  restart: 'Neustart'
</i18n>
