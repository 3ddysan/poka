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
    class="logo box-content h-14 w-8 flex select-none items-center justify-center bg-gray-400 bg-opacity-90 pt-2 text-[11px] tracking-3px uppercase shadow-xl dark:bg-[#393a59]"
  >
    <span class="font-bold text-white write-vertical-right dark:text-[#f8f8f3]"
      >Poka</span
    >
    <div
      class="absolute top-15 h-2 w-8 border-b-2 bg-gray-300 dark:border-[#d863bb] dark:bg-[#6a6577]"
    ></div>
  </h1>
</template>
<style scoped>
.logo {
  text-shadow: #fff 0px 0px 5px;
}
</style>
