<template>
  <div class="flex flex-col md:flex-row">
    <aside
      class="flex items-center justify-center p-4 bg-gray-200 md:flex-none md:w-1/3 lg:w-1/5"
    >
      <slot name="sidebar" />
    </aside>
    <main class="min-h-screen p-4 bg-gray-100 w-full flex-row">
      <slot name="main" />
    </main>
  </div>
</template>
