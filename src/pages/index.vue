<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const name = ref(user.name);
const go = () => {
  if (name.value) {
    user.setName(name.value);
  }
};
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div>
      <input
        v-model="name"
        type="text"
        equired
        :class="{ 'border-red-300': user.connected == null }"
        class="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:(outline-none ring-indigo-500 border-indigo-500)"
        placeholder="Username"
        autocomplete="false"
        @keydown.enter="go"
      />
      <button
        :disabled="!name"
        @click="go"
        class="w-full py-2 bg-blue-600 text-white font-medium uppercase rounded-b-md shadow-md hover:(bg-blue-700 shadow-lg) focus:(bg-blue-700 shadow-lg outline-none ring-0) active:(bg-blue-800 shadow-lg)"
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
