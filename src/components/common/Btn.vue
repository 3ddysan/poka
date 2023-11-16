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
  click: [value: void];
}>();
defineSlots<{
  default(props: Record<string, never>): unknown;
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
    class="btn font-medium border-none shadow-md active:(shadow-lg) disabled:(shadow-none) focus:(shadow-lg outline-none ring-0) hover:(shadow-lg)"
    @click="$emit('click')"
  >
    <span class="text h-full inline-flex items-center justify-center gap-1">
      <slot />
    </span>
  </button>
</template>
<style scoped>
.btn {
  background-color: var(--primary);
  color: var(--on-primary);

  &:disabled {
    background-color: var(--background);
    filter: opacity(0.5);
  }

  &:disabled .text {
    filter: brightness(0.5);
  }

  &:hover {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    );
  }
}
.btn:active {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
}
</style>
