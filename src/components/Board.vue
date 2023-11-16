<script lang="ts">
export const values = [
  '0',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '?',
  '☕',
] as const;
</script>

<script setup lang="ts">
import type { Results } from '@/types';

defineProps({
  selected: {
    type: String as PropType<string | null>,
    default: null,
  },
  results: {
    type: Object as PropType<Results>,
    default: undefined,
  },
  marked: {
    type: String as PropType<string>,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
defineEmits<{
  'update:selected': [value: string];
}>();
</script>

<template>
  <div class="grid grid-cols-4 gap-5 <sm:grid-cols-3">
    <Card
      v-for="value in values"
      :key="value"
      :selected="selected === value"
      :votes="results?.[value]"
      :shrink="results ? results[value] == null : false"
      :mark="marked === value"
      :disabled="disabled"
      @click="$emit('update:selected', value)"
      >{{ value }}</Card
    >
  </div>
</template>
