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
  login: [name: string];
  spectate: [name: string];
}>();
const name = ref(props.name);
const isSpectator = ref(props.spectate);
const mode = computed(() => (isSpectator.value ? 'spectate' : 'login'));
const { t } = useI18n();
const submit = () =>
  name.value &&
  (isSpectator.value
    ? emit('spectate', name.value)
    : emit('login', name.value));
</script>

<template>
  <div class="relative">
    <VDropdown theme="alert" :shown="!!errorMessage">
      <input
        v-model.trim="name"
        type="text"
        data-testid="login-name"
        :class="errorMessage ? 'border-red-300' : ''"
        class="name w-full border rounded-t-md py-2 pl-3 pr-8 focus:(outline-none)"
        :placeholder="t('username')"
        autocomplete="false"
        @keydown.enter="submit"
      />
      <template #popper>
        <span data-testid="login-error">{{ errorMessage }}</span>
      </template>
    </VDropdown>
    <Toggle
      v-model="isSpectator"
      :tooltip="t('mode')"
      class="mode absolute right-1 top-2"
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
.name {
  width: 250px;
  border-color: var(--on-background);
  color: var(--on-surface);
  &:focus {
    border-color: var(--primary);
  }
}

.mode {
  color: var(--on-surface);
}
</style>

<style>
.v-popper--theme-alert {
  & .v-popper__inner {
    background-color: var(--error);
    color: var(--on-error);
    padding: 4px;
    border-radius: 8px;
  }
  & .v-popper__arrow-outer {
    border-color: var(--error);
  }
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
