<script lang="ts" setup>
const props = defineProps({
  disabledAction: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: undefined,
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
  <div class="has-tooltip">
    <span
      :class="!!errorMessage ? 'tooltip-show' : undefined"
      class="tooltip danger-arrow-bottom block p-2 text-white font-medium text-center rounded-lg shadow-md mb-3 bg-red-600"
      data-testid="login-error"
      >{{ errorMessage }}</span
    >
    <input
      v-model.trim="name"
      type="text"
      data-testid="login-name"
      equired
      :class="!!errorMessage ? 'border-red-300' : 'border-gray-300'"
      class="w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500)"
      :placeholder="t('username')"
      autocomplete="false"
      @keydown.enter="login()"
    />
    <button
      :disabled="disabledAction"
      class="w-full py-2 bg-blue-600 text-white font-medium uppercase rounded-b-md shadow-md hover:(bg-blue-700 shadow-lg) focus:(bg-blue-700 shadow-lg outline-none ring-0) active:(bg-blue-800 shadow-lg) disabled:(bg-gray-200 text-gray-500 shadow-none)"
      data-testid="login-action"
      @click="login()"
    >
      {{ t('login') }}
    </button>
  </div>
</template>

<style scoped>
.tooltip {
  @apply invisible absolute;
  min-height: 40px;
}

.has-tooltip .tooltip.tooltip-show {
  @apply visible z-50;
}

.danger-arrow-bottom {
  position: relative;
}

.danger-arrow-bottom:before {
  content: '';
  position: absolute;
  left: 40px;
  bottom: -20px;
  border-top: 10px solid red;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
}
</style>

<i18n>
en:
  login: 'Login'
  username: 'Username'
de:
  login: 'Anmelden'
  username: 'Benutzername'
</i18n>
