<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  shrink: {
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
    ? ['text-white', 'bg-blue-400', 'dark:text-[#d863bb]', 'dark:bg-[#282a36]']
    : [
        ...(props.disabled
          ? ['text-gray-400']
          : ['text-gray-700', 'dark:text-[#f8f8f3]']),
        'bg-white',
        'dark:bg-[#6a6577]',
      ]
  ).concat(
    props.mark ? ['shadow-lg', 'shadow-blue-400', 'dark:shadow-[#d863bb]'] : [],
  ),
);
</script>

<template>
  <div
    data-testid="card"
    class="relative transform transition-transform dark:hover:text-[#8be9fd]"
    :class="{ 'scale-80': shrink }"
  >
    <button
      data-testid="card-action"
      :class="classes"
      class="flex flex-col px-3 select-none border dark:border-[#282a36] hover:shadow-md dark:hover:shadow-[#8be9fd] dark:hover:text-[#8be9fd] rounded w-6em h-8em font-sans"
      @click="disabled || $emit('click')"
    >
      <div data-testid="card-top-value" class="text-left text-xs w-full">
        <slot />
      </div>
      <div
        data-testid="card-value"
        :class="{ 'border-white': selected, 'dark:border-[#d863bb]': selected }"
        class="border dark:hover:border-[#8be9fd] text-6xl flex-grow flex items-center justify-center w-full"
      >
        <slot />
      </div>
      <div data-testid="card-bottom-value" class="text-right text-xs w-full">
        <slot />
      </div>
    </button>
    <div
      v-show="votes > 0"
      data-testid="card-votes"
      class="z-1 absolute -top-3 left-18 shadow-md bg-white dark:text-[#393a59] dark:bg-[#f8f8f3] border-gray-500 ring-3 dark:ring-[#d863bb] rounded-full h-10 w-10 rounded-full p-2 font-bold text-center"
    >
      {{ votes }}
    </div>
  </div>
</template>
