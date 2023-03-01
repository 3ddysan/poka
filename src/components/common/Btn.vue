<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
});
defineEmits<{
  (e: 'click'): void;
}>();
const classes = computed(() => ({
  rounded: props.rounded,
  'py-2': !props.dense,
  'px-4': !props.dense,
  'py-1': props.dense,
  'px-2': props.dense,
}));
</script>
<template>
  <button
    :disabled="disabled"
    :class="classes"
    class="bg-blue-600 dark:bg-[#6371a4] text-white font-medium shadow-md hover:(bg-blue-700 dark:text-[#8be9fd] dark:bg-[#6371a4] shadow-lg) focus:(bg-blue-700 dark:bg-[#6371a4] shadow-lg outline-none ring-0) active:(bg-blue-800 shadow-lg) disabled:(bg-gray-200 dark:bg-[#44475a] text-gray-500 dark:text-[#282a36] shadow-none) inline-flex items-center justify-center gap-1"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
