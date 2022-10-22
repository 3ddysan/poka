<script setup lang="ts">
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const name = ref(state.name);
const login = () => {
  if (name.value) {
    state.login(name.value);
  }
};
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div>
      <input
        v-model.trim="name"
        v-focus
        type="text"
        data-testid="login-name"
        equired
        :class="{ 'border-red-300': state.connected == null }"
        class="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500)"
        placeholder="Username"
        autocomplete="false"
        @keydown.enter="login()"
      />
      <button
        :disabled="!name"
        class="w-full py-2 bg-blue-600 text-white font-medium uppercase rounded-b-md shadow-md hover:(bg-blue-700 shadow-lg) focus:(bg-blue-700 shadow-lg outline-none ring-0) active:(bg-blue-800 shadow-lg)"
        data-testid="login-action"
        @click="login()"
      >
        Login
      </button>
    </div>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
