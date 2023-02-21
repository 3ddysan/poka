<script setup lang="ts">
import { useStore } from '@/stores/state';
import { useDetectParallelInstance } from '@/composables/detector';

const state = useStore();
const showDuplicateInstanceWarning = ref(false);
const { closeOther } = useDetectParallelInstance(() => {
  showDuplicateInstanceWarning.value = true;
}, state.logout);
const { t } = useI18n();
</script>

<template>
  <Teleport to="body">
    <div class="absolute top-0 left-3">
      <Logo :animate="state.mode === 'ready'" />
    </div>
  </Teleport>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Modal v-model="showDuplicateInstanceWarning" :title="t('title')">
    {{ t('duplicate-warning') }}
    <template #actions>
      <Btn class="mr-2" dense>{{ t('close') }}</Btn>
      <Btn dense @click="closeOther">{{ t('use-here') }}</Btn>
    </template>
  </Modal>
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
<style>
html,
body,
#app {
  height: 100%;
}
</style>

<i18n>
  en:
    title: Attention
    duplicate-warning: 'Poka is open in another window. Click "Use Here" to use Poka in this tab.'
    close: 'Close'
    use-here: 'Use here'
  de:
    title: Achtung
    duplicate-warning: 'Poka ist schon in einem anderen Fenster offen. Klick "Hier nutzen" um Poka im aktuellen Tab zu nutzen.'
    close: 'Schließen'
    use-here: 'Hier nutzen'
  </i18n>
