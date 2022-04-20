<script setup lang="ts">
defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  mark: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  votes: {
    type: Number,
    default: 0,
  },
});
defineEmits(['click']);
</script>

<template>
  <div class="relative">
    <button
      :class="{
        'bg-white': !selected,
        'bg-blue-400': selected,
        'text-gray-700': !selected,
        'text-white': selected,
        'shadow-lg': mark,
        'shadow-blue-400': mark,
      }"
      class="flex flex-col px-3 select-none border hover:shadow-md rounded w-6em h-8em font-sans"
      @click="disabled || $emit('click')"
    >
      <div class="text-left text-xs w-full"><slot /></div>
      <div
        :class="{ 'border-white': selected }"
        class="border text-6xl flex-grow flex items-center justify-center w-full"
      >
        <slot />
      </div>
      <div class="text-right text-xs w-full"><slot /></div>
    </button>
    <div
      v-show="votes !== 0"
      class="absolute -top-3 left-18 shadow-md bg-white border-gray-500 ring-3 rounded-full h-10 w-10 rounded-full p-2 font-bold text-center"
    >
      {{ votes }}
    </div>
  </div>
</template>
