<script setup lang="ts">
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
</script>

<template>
  <div class="flex items-center">
    <input
      v-model="checked"
      data-testid="mode-action"
      type="checkbox"
      class="opacity-0 absolute h-5 w-5"
      :title="tooltip"
    />
    <i-mdi-eye-outline v-if="checked" data-testid="mode-icon" class="icon" />
    <i-mdi-eye-off-outline v-else data-testid="mode-icon" class="icon" />
  </div>
</template>

<style scoped>
input:focus + .icon {
  @apply border border-indigo-500;
}
</style>
