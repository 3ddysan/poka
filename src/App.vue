<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const router = useRouter();

router.beforeEach(async (to, from, next) => {
  if (to.name === 'index') {
    user.setName('');
    next();
    return;
  }
  if (user.connected) {
    next();
  } else {
    next('/');
  }
});

watch(
  () => user.connected,
  (connected) => {
    if (connected) {
      router.push('/board');
    } else {
      router.push('/');
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
