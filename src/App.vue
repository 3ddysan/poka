<script setup lang="ts">
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const { locale } = useI18n();
const { language } = useNavigatorLanguage();
const params = useUrlSearchParams('history');
const queryLang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
watch(
  language,
  (lang) => {
    locale.value = queryLang || lang?.split('-')[0] || 'en';
  },
  { immediate: true },
);
</script>

<template>
  <div class="absolute top-0 left-3">
    <h1
      :class="{ 'animate-bounce': state.mode === 'ready' }"
      class="flag select-none tracking-3px uppercase box-content pt-2 w-8 h-14 flex items-center justify-center shadow-xl"
    >
      <span class="text-gray-300 write-vertical-right">Poka</span>
      <div class="w-8 h-2 bg-gray-400 absolute top-15"></div>
    </h1>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.flag {
  background: #32557f;
  color: #7eb4e2;
  font-size: 11px;
  opacity: 0.9;
}
</style>
