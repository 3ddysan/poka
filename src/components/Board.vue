<script setup lang="ts">
import type { Results } from '@/stores/user';
import type { PropType } from 'vue';

const values = ['0', '1', '2', '3', '5', '8', '13', '20', '?', '☕'] as const;
// type Vote = typeof values[number] | null;
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
  (e: 'update:selected', value: string): void;
}>();
</script>

<template>
  <div
    class="grid <sm:grid-cols-3 sm:grid-cols-4 grid-rows-4 gap-5 lg:max-w-1/2"
  >
    <Card
      v-for="value in values"
      :key="value"
      :selected="selected === value"
      :votes="results?.[value] ?? 0"
      :mark="marked === value"
      :disabled="disabled"
      @click="$emit('update:selected', value)"
      >{{ value }}</Card
    >
  </div>
</template>
