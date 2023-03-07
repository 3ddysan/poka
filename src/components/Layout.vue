<template>
  <div class="h-full grid md:grid-rows-1 md:grid-flow-col">
    <div class="sidebar flex md:justify-end justify-center items-center p-5">
      <slot name="sidebar" />
    </div>
    <div
      class="main p-5 flex md:justify-start justify-center vmd:items-center <vmd:overflow-y-auto"
    >
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
</style>
