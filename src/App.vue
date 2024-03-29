<script setup lang="ts">
import { useStore } from '@/stores/state';
import { useDetectParallelInstance } from '@/composables/detector';
import { useSound } from '@/composables/sound';

const state = useStore();
const { isSoundOn } = useSound();
const showDuplicateInstanceWarning = ref(false);
const { closeOther } = useDetectParallelInstance(() => {
  showDuplicateInstanceWarning.value = true;
}, state.logout);
const { t } = useI18n();
const isDark = useDark({
  selector: 'html',
});
</script>

<template>
  <Teleport to="body">
    <div class="absolute left-3 top-0">
      <Logo :animate="state.mode === 'ready'" />
    </div>
    <div class="absolute right-2 top-2">
      <VMenu theme="settings" eager>
        <i-mdi-cog class="toggle" />
        <template #popper>
          <Toggle
            v-model="isDark"
            :tooltip="isDark ? t('dark-mode') : t('light-mode')"
            class="toggle text-xl"
          >
            <template #on>
              <i-mdi-weather-night />
            </template>
            <template #off>
              <i-mdi-weather-sunny />
            </template>
          </Toggle>
          <Toggle
            v-model="isSoundOn"
            :tooltip="isSoundOn ? t('sound-on') : t('sound-off')"
            class="toggle text-xl"
          >
            <template #on>
              <i-mdi-volume />
            </template>
            <template #off>
              <i-mdi-volume-mute />
            </template>
          </Toggle>
        </template>
      </VMenu>
    </div>
  </Teleport>
  <router-view v-slot="{ Component }" class="font-sans">
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
.toggle {
  color: var(--on-background);
  font-size: 1.5em;

  &:hover {
    filter: brightness(0.7);
  }
}
</style>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.v-popper--theme-settings {
  color: var(--on-background);
  display: flex;
  align-items: center;

  & .v-popper__inner {
    padding: 4px;
    background-color: var(--background);
  }

  & .v-popper__arrow-outer {
    visibility: hidden;
  }

  & .v-popper__arrow-inner {
    visibility: hidden;
  }
}
</style>

<i18n>
  en:
    title: Attention
    duplicate-warning: 'Poka is open in another window. Click "Use Here" to use Poka in this tab.'
    close: 'Close'
    use-here: 'Use here'
    sound-on: Disable Sound Effects
    sound-off: Enable Sound Effects
    dark-mode: Toggle Light Mode
    light-mode: Toggle Dark Mode
  de:
    title: Achtung
    duplicate-warning: 'Poka ist schon in einem anderen Fenster offen. Klick "Hier nutzen" um Poka im aktuellen Tab zu nutzen.'
    close: 'Schließen'
    use-here: 'Hier nutzen'
    sound-on: Audio ausschalten
    sound-off: Audio anschalten
    dark-mode: Hellen Modus aktivieren
    light-mode: Dunklen Modus aktivieren
  </i18n>
