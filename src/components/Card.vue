<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  shrink: {
    type: Boolean,
    default: false,
  },
  mark: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  votes: {
    type: Number,
    default: 0,
  },
});
defineEmits(['click']);
defineSlots<{
  default(props: Record<string, never>): unknown;
}>();
const classes = computed(() => ({
  selected: props.selected,
  disabled: !props.selected && props.disabled,
  marked: props.mark,
  shrink: props.shrink,
}));
</script>

<template>
  <div data-testid="card" class="relative">
    <button
      data-testid="card-action"
      :class="classes"
      class="card h-8em w-6em flex flex-col transform select-none border rounded border-solid px-3 transition-transform hover:shadow-md"
      @click="disabled || $emit('click')"
    >
      <div data-testid="card-top-value" class="value w-full text-left text-xs">
        <slot />
      </div>
      <div
        data-testid="card-value"
        :class="{ selected }"
        class="card-value w-full flex flex-grow items-center justify-center border border-solid text-5xl"
      >
        <span class="value"><slot /></span>
      </div>
      <div
        data-testid="card-bottom-value"
        class="value w-full text-right text-xs"
      >
        <slot />
      </div>
    </button>
    <div
      v-show="votes > 0"
      data-testid="card-votes"
      class="votes absolute left-18 z-1 h-10 w-10 rounded-full rounded-full border-solid p-2 text-center font-bold -top-3"
    >
      {{ votes }}
    </div>
  </div>
</template>

<style scoped>
.card {
  border-color: var(--background);
  background-color: var(--surface);
  color: var(--on-surface);

  &:not(.shrink).disabled .value {
    filter: opacity(1);
  }
}
.card-value {
  border-color: var(--background);
}

.selected {
  background-color: var(--secondary);
  color: var(--on-secondary);
}

.shrink {
  --at-apply: scale-x-80 scale-y-80;
}

.disabled .card-value {
  filter: opacity(0.5);
}

.marked {
  box-shadow:
    0 10px 15px -3px var(--secondary),
    0 4px 6px -4px var(--secondary);
}

.votes {
  background-color: var(--surface);
  color: var(--on-surface);
  box-shadow:
    0 4px 6px -1px var(--secondary),
    0 2px 4px -2px var(--secondary);
  border-color: var(--secondary);
  border-width: 1px;
}
</style>
