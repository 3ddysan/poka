<script setup lang="ts">
const props = defineProps({
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
const classes = computed(() =>
  (props.selected
    ? ['text-white', 'bg-blue-400']
    : ['bg-white', 'text-gray-700']
  ).concat(props.mark ? ['shadow-lg', 'shadow-blue-400'] : []),
);
</script>

<template>
  <div data-testid="card" class="relative">
    <button
      data-testid="card-action"
      :class="classes"
      class="flex flex-col px-3 select-none border hover:shadow-md rounded w-6em h-8em font-sans"
      @click="disabled || $emit('click')"
    >
      <div data-testid="card-top-value" class="text-left text-xs w-full">
        <slot />
      </div>
      <div
        data-testid="card-value"
        :class="{ 'border-white': selected }"
        class="border text-6xl flex-grow flex items-center justify-center w-full"
      >
        <slot />
      </div>
      <div data-testid="card-bottom-value" class="text-right text-xs w-full">
        <slot />
      </div>
    </button>
    <div
      v-show="votes !== 0"
      data-testid="card-votes"
      class="z-1 absolute -top-3 left-18 shadow-md bg-white border-gray-500 ring-3 rounded-full h-10 w-10 rounded-full p-2 font-bold text-center"
    >
      {{ votes }}
    </div>
  </div>
</template>
