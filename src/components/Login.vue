<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
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
  (event: 'spectate', name: string): void;
}>();

const name = ref(props.name);
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
      :class="!!errorMessage ? 'border-red-300' : 'border-gray-300'"
      class="w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500)"
      :placeholder="t('username')"
      autocomplete="false"
      @keydown.enter="name && emit('login', name)"
    />
    <div class="flex">
      <Btn
        :disabled="disabledAction"
        :rounded="false"
        class="w-full rounded-bl-md uppercase"
        data-testid="login-action"
        @click="name && emit('login', name)"
      >
        <i-mdi-login /> {{ t('login') }}
      </Btn>
      <Btn
        :rounded="false"
        class="w-full rounded-br-md uppercase"
        data-testid="spectate-action"
        @click="name && emit('spectate', name)"
      >
        <i-mdi-glasses /> {{ t('spectate') }}
      </Btn>
    </div>
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
  spectate: 'Spectate'
  username: 'Username'
de:
  login: 'Anmelden'
  spectate: 'Zuschauen'
  username: 'Benutzername'
</i18n>
