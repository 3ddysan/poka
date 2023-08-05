<script lang="ts" setup>
import type { User, Mode } from '@/types';

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
const emit = defineEmits(['show-results', 'reset-results', 'logout', 'kick']);
const { t } = useI18n();
const promptUserLogout = ref('');
const truncate = (name: string) =>
  name.substring(0, Math.min(10, name.length)) +
  (name.length > 10 ? '...' : '');
const kick = (name: string) => {
  promptUserLogout.value = '';
  emit('kick', name);
};
</script>

<template>
  <div class="card max-h-180 min-w-65 rounded-md px-8 py-4 shadow-lg">
    <div>
      <h2 data-testid="user-list-title" class="text-center">
        {{ t('title') }} ({{ users.length }})
      </h2>
      <ul class="users mt-2">
        <li
          class="flex"
          data-testid="user-list-entry"
          v-for="{ name, voted, vote, spectate } in users"
          :key="name"
          @mouseover="promptUserLogout = name"
          @mouseleave="promptUserLogout = ''"
        >
          <span
            v-if="promptUserLogout !== userName && promptUserLogout === name"
            class="user-list-entry-kick"
          >
            <a
              href="#"
              data-testid="user-list-entry-kick-action"
              @click.prevent="kick(name)"
              >{{ t('kick', { name: truncate(name) }) }}</a
            >
          </span>
          <span
            :class="{ 'font-bold': userName === name }"
            data-testid="user-list-entry-name"
            class="user-list-entry-name flex-grow truncate"
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
    <div class="mt-4 flex justify-around space-x-2">
      <Btn
        v-if="mode === 'results'"
        key="restart"
        dense
        data-testid="user-list-restart-action"
        @click="emit('reset-results')"
      >
        <i-mdi-restart /> {{ t('restart') }}
      </Btn>
      <Btn
        v-else
        key="results"
        dense
        data-testid="user-list-results-action"
        @click="emit('show-results')"
        :disabled="mode !== 'ready'"
      >
        <i-mdi-vote /> {{ t('results') }}
      </Btn>
      <Btn
        key="logout"
        dense
        data-testid="user-list-logout-action"
        @click="emit('logout')"
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

.user-list-entry-kick {
  filter: brightness(0.5);
  background-color: var(--surface);
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: var(--on-surface);
}

.card {
  background-color: var(--surface);
  color: var(--on-surface);
}

.users {
  filter: brightness(2);
}
</style>

<i18n>
en:
  title: 'User'
  logout: 'Logout'
  kick: 'Remove {name}?'
  results: 'Result'
  restart: 'Restart'
de:
  title: 'Benutzer'
  logout: 'Abmelden'
  kick: '{name} entfernen?'
  results: 'Ergebnis'
  restart: 'Neustart'
</i18n>
