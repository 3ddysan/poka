<template>
  <div class="h-full grid md:grid-rows-1 md:grid-flow-col">
    <div
      class="bg-gray-200 flex md:justify-end justify-center items-center p-5"
    >
      <slot name="sidebar" />
    </div>
    <div
      class="bg-gray-100 p-5 flex md:justify-start justify-center items-center"
    >
      <slot name="main" />
    </div>
  </div>
</template>
