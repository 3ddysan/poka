<script lang="ts" setup>
defineProps({
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: 'login', name: string): void;
}>();

const name = ref('');
const login = () => {
  if (name.value) emit('login', name.value);
};
const { t } = useI18n();
</script>
<template>
  <div>
    <input
      v-model.trim="name"
      type="text"
      data-testid="login-name"
      equired
      :class="error ? 'border-red-300' : 'border-gray-300'"
      class="w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500)"
      :placeholder="t('username')"
      autocomplete="false"
      @keydown.enter="login()"
    />
    <button
      :disabled="!name"
      class="w-full py-2 bg-blue-600 text-white font-medium uppercase rounded-b-md shadow-md hover:(bg-blue-700 shadow-lg) focus:(bg-blue-700 shadow-lg outline-none ring-0) active:(bg-blue-800 shadow-lg)"
      data-testid="login-action"
      @click="login()"
    >
      {{ t('login') }}
    </button>
  </div>
</template>

<i18n>
en:
  login: 'Login'
  username: 'Username'
de:
  login: 'Anmelden'
  username: 'Benutzername'
</i18n>
