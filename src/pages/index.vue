<script setup lang="ts">
import { useStateStore } from '@/stores/state';

const state = useStateStore();
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <Login :error="state.error" @login="state.login" />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
