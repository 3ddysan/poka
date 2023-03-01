<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  spectate: {
    type: Boolean,
    default: false,
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
  (event: 'login' | 'spectate', name: string): void;
}>();
const name = ref(props.name);
const isSpectator = ref(props.spectate);
const mode = computed(() => (isSpectator.value ? 'spectate' : 'login'));
const { t } = useI18n();
const submit = () => name.value && emit(mode.value, name.value);
</script>
<template>
  <div class="has-tooltip relative">
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
      class="w-full px-3 py-2 border dark:border-[#6371a4] placeholder-gray-500 text-gray-900 dark:text-[#f8f8f3] dark:bg-[#44475a] rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500) dark:focus:(outline-none ring-[#8be9fd] border-[#8be9fd])"
      :placeholder="t('username')"
      autocomplete="false"
      @keydown.enter="submit"
    />
    <Toggle
      v-model="isSpectator"
      :tooltip="t('mode')"
      class="absolute inset-y-18 right-2"
    >
      <template #on>
        <i-fluent-glasses-48-regular />
      </template>
      <template #off>
        <i-fluent-glasses-off-48-regular />
      </template>
    </Toggle>
    <div class="flex">
      <Btn
        :disabled="disabledAction"
        :rounded="false"
        class="w-full rounded-b-md uppercase"
        data-testid="submit-action"
        @click="submit"
      >
        <i-fluent-glasses-48-regular v-if="isSpectator" /><i-mdi-login v-else />
        {{ t(mode) }}
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
  mode: 'Switch Mode'
  spectate: 'Spectate'
  username: 'Username'
de:
  login: 'Anmelden'
  mode: 'Teilnahmemodus wechseln'
  spectate: 'Zuschauen'
  username: 'Benutzername'
</i18n>
