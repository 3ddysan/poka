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
const classes = computed(() => ({
  selected: props.selected,
  disabled: !props.selected && props.disabled,
  marked: props.mark,
}));
</script>

<template>
  <div
    data-testid="card"
    class="card relative transform transition-transform"
    :class="{ shrink }"
  >
    <button
      data-testid="card-action"
      :class="classes"
      class="flex flex-col px-3 select-none border hover:shadow-md rounded w-6em h-8em font-sans"
      @click="disabled || $emit('click')"
    >
      <div data-testid="card-top-value" class="value text-left text-xs w-full">
        <slot />
      </div>
      <div
        data-testid="card-value"
        :class="{ selected }"
        class="border text-6xl flex-grow flex items-center justify-center w-full"
      >
        <span class="value"><slot /></span>
      </div>
      <div
        data-testid="card-bottom-value"
        class="value text-right text-xs w-full"
      >
        <slot />
      </div>
    </button>
    <div
      v-show="votes > 0"
      data-testid="card-votes"
      class="votes z-1 absolute -top-3 left-18 ring-3 rounded-full h-10 w-10 rounded-full p-2 font-bold text-center"
    >
      {{ votes }}
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: var(--surface);
  color: var(--on-surface);

  &:not(.shrink) .disabled .value {
    filter: opacity(1);
  }
}

.selected {
  background-color: var(--secondary);
  color: var(--on-secondary);
}

.shrink {
  @apply scale-x-80 scale-y-80;
}

.disabled .value {
  filter: opacity(0.5);
}

.marked {
  box-shadow: 0 10px 15px -3px var(--secondary), 0 4px 6px -4px var(--secondary);
}

.votes {
  background-color: var(--surface);
  color: var(--on-surface);
  box-shadow: 0 4px 6px -1px var(--secondary), 0 2px 4px -2px var(--secondary);
  border-color: var(--secondary);
  border-width: 1px;
}
</style>
