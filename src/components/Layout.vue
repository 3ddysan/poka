<template>
  <div class="h-full grid md:grid-rows-1 md:grid-flow-col">
    <div
      class="bg-gray-200 dark:bg-[#282a36] flex md:justify-end justify-center items-center p-5"
    >
      <slot name="sidebar" />
    </div>
    <div
      class="bg-gray-100 dark:bg-[#44475a] p-5 flex md:justify-start justify-center vmd:items-center <vmd:overflow-y-auto"
    >
      <slot name="main" />
    </div>
  </div>
</template>
