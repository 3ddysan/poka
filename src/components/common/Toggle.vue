<script setup lang="ts">
import { useSound } from '@/composables/sound';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
  },
});
const emit = defineEmits(['update:modelValue']);
const checked = useVModel(props, 'modelValue', emit, { passive: true });
const { play } = useSound();
watch(checked, () => {
  play('toggle');
});
</script>

<template>
  <div class="flex items-center" @click="checked = !checked" :title="tooltip">
    <input
      v-model="checked"
      data-testid="mode-action"
      type="checkbox"
      class="opacity-0 absolute h-5 w-5"
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
