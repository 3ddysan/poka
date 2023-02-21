<script setup lang="ts">
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
const emit = defineEmits(['update:modelValue']);
const isOpen = useVModel(props, 'modelValue', emit, { passive: true });
const dialog = ref();
useEventListener(dialog, 'close', () => {
  isOpen.value = false;
});
// onClickOutside(dialog, () => {
//   dialog.value.close();
// });
</script>
<template>
  <div
    v-if="overlay && isOpen"
    class="fixed inset-0 backdrop-filter backdrop-grayscale overflow-y-auto h-full w-full"
  ></div>
  <dialog
    ref="dialog"
    :style="{
      minWidth: width,
      maxWidth: width,
    }"
    class="modal relative p-0 rounded shadow-lg border border-gray-500/10"
    :open="isOpen ? true : undefined"
  >
    <template v-if="!!title">
      <h1 class="p-2 truncate">
        {{ title }}
      </h1>
      <hr v-if="separator" class="mb-2" />
    </template>
    <form method="dialog">
      <p class="p-2 overflow-auto"><slot /></p>
      <template v-if="$slots.actions != null">
        <hr v-if="separator" class="mb-2" />
        <div class="pb-2 px-2 flex justify-end">
          <slot name="actions" />
        </div>
      </template>
    </form>
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: v-bind(width);
  transform: translate(-50%, -50%);
}
</style>
