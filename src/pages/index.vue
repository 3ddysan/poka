<script setup lang="ts">
import { useStore } from '@/stores/state';

const state = useStore();
const { t } = useI18n();
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <Login
      :error="state.error"
      :error-message="state.error ? t(`error.${state.error}`) : undefined"
      :name="state.previousName"
      :spectate="state.spectate"
      @login="state.login($event, false)"
      @spectate="state.login($event, true)"
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
