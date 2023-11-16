<script setup lang="ts">
import { useSound } from '@/composables/sound';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
    required: true,
  },
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
defineSlots<{
  on(props: Record<string, never>): unknown;
  off(props: Record<string, never>): unknown;
}>();
const checked = useVModel(props, 'modelValue', emit, { passive: true });
const { play } = useSound();
watch(checked, () => {
  play('toggle');
});
</script>

<template>
  <div class="flex items-center" :title="tooltip" @click="checked = !checked">
    <input
      v-model="checked"
      data-testid="mode-action"
      type="checkbox"
      class="absolute h-5 w-5 opacity-0"
    />
    <div data-testid="mode-icon" class="icon flex items-center">
      <slot v-if="checked" name="on">✓</slot>
      <slot v-else name="off">×</slot>
    </div>
  </div>
</template>

<style scoped>
.icon {
  border: 1px solid transparent;
}
input:focus + .icon {
  border-color: var(--primary);
}
</style>
