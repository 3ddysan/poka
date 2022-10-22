<script setup lang="ts">
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
</style>
