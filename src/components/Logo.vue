<script setup lang="ts">
defineProps({
  animate: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <h1
    :class="{ 'animate-bounce': animate }"
    class="logo text-[11px] bg-opacity-90 bg-gray-400 dark:bg-[#393a59] select-none tracking-3px uppercase box-content pt-2 w-8 h-14 flex items-center justify-center shadow-xl"
  >
    <span class="text-white dark:text-[#f8f8f3] write-vertical-right font-bold"
      >Poka</span
    >
    <div
      class="w-8 h-2 bg-gray-300 dark:bg-[#6a6577] absolute top-15 border-b-2 dark:border-[#d863bb]"
    ></div>
  </h1>
</template>
<style scoped>
.logo {
  text-shadow: #fff 0px 0px 5px;
}
</style>
