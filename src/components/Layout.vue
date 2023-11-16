<script setup lang="ts">
defineSlots<{
  main(props: Record<string, never>): unknown;
  sidebar(props: Record<string, never>): unknown;
}>();
</script>
<template>
  <div class="grid h-full md:grid-flow-col md:grid-rows-1">
    <div class="sidebar flex items-center justify-center p-5 md:justify-end">
      <slot name="sidebar" />
    </div>
    <div class="main flex justify-center p-5 md:justify-start">
      <slot name="main" />
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  background-color: var(--background);
}
.main {
  background-color: var(--background-variant);
}
@media (min-width: 768px) and (min-height: 480px) {
  .main {
    align-items: center;
  }
}
@media (min-width: 768px) and (max-height: 480px) {
  .main {
    overflow-y: auto;
  }
}
</style>
