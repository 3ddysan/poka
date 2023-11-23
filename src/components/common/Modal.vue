<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '30%',
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
defineSlots<{
  default(props: Record<string, never>): unknown;
  actions(props: Record<string, never>): unknown;
}>();
const isOpen = useVModel(props, 'modelValue', emit, { passive: true });
const dialog = ref();
useEventListener(dialog, 'close', () => {
  isOpen.value = false;
});
</script>

<template>
  <div
    v-if="overlay && isOpen"
    class="fixed inset-0 h-full w-full overflow-y-auto"
  />
  <dialog
    ref="dialog"
    :style="{
      minWidth: width,
      maxWidth: width,
    }"
    class="modal relative border border-gray-500/10 rounded p-0 shadow-lg"
    :open="isOpen ? true : undefined"
    v-bind="$attrs"
  >
    <template v-if="!!title">
      <h1 class="truncate p-2 font-bold">
        {{ title }}
      </h1>
      <hr v-if="separator" class="mb-2" />
    </template>
    <form method="dialog">
      <p class="overflow-auto p-2"><slot /></p>
      <template v-if="$slots.actions != null">
        <hr v-if="separator" class="mb-2" />
        <div class="flex justify-end px-2 pb-2">
          <slot name="actions" />
        </div>
      </template>
    </form>
  </dialog>
</template>

<style scoped>
.modal {
  background-color: var(--surface);
  color: var(--on-surface);
  position: fixed;
  top: 50%;
  left: v-bind(width);
  transform: translate(-50%, -50%);
}
</style>
