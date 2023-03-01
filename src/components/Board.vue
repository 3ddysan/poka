<script setup lang="ts">
import type { Results } from '@/types';
import type { PropType } from 'vue';

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
  values: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
defineEmits<{
  (e: 'update:selected', value: string): void;
}>();
</script>

<template>
  <div class="grid <sm:grid-cols-3 grid-cols-4 gap-5">
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
