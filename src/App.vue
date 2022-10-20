<script lang="ts" setup>
import { useStateStore } from '@/stores/state';

const state = useStateStore();
const router = useRouter();

router.beforeEach(async (to, from, next) => {
  if (to.name === 'index') {
    state.setName('');
    next();
    return;
  }
  if (state.connected) {
    next();
  } else {
    next({ name: 'index' });
  }
});

watch(
  () => state.connected,
  (connected) => {
    if (connected) {
      router.push({ name: 'plan' });
    } else {
      router.push({ name: 'index' });
    }
  },
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
