<script setup lang="ts">
import { useStore } from '@/stores/state';

const state = useStore();
const { t } = useI18n();
const isNameTaken = ref(false);
const login = async (name: string, spectate = false) => {
  isNameTaken.value = await state.isNameTaken(name);
  if (!isNameTaken.value) state.login(name, spectate);
};
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <Login
      :error="state.error"
      :error-message="
        isNameTaken
          ? t('error.name')
          : state.error
          ? t('error.server')
          : undefined
      "
      :name="state.previousName"
      :spectate="state.spectate"
      @login="login"
      @spectate="login($event, true)"
    />
  </div>
</template>

<i18n>
  en:
    error:
      name: 'Please, choose a different name!'
      server: 'Server does not responde.'
  de:
    error:
      name: 'Bitte, wähle einen anderen Namen!'
      server: 'Der Server reagiert nicht.'
</i18n>
