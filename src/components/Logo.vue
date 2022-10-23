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
    class="text-[11px] bg-opacity-90 bg-[#32557f] select-none tracking-3px uppercase box-content pt-2 w-8 h-14 flex items-center justify-center shadow-xl"
  >
    <span class="text-white write-vertical-right font-bold">Poka</span>
    <div class="w-8 h-2 bg-gray-400 absolute top-15 border-b-2"></div>
  </h1>
</template>
