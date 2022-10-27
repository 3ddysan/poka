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
    <Logo :animate="state.mode === 'ready'" />
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

:global(#app) {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
