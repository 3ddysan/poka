<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const router = useRouter();

watch(
  () => user.connected,
  (connected) => {
    if (connected) {
      router.push('/board');
    } else {
      user.reset();
      router.push('/');
    }
  },
);
</script>

<template>
  <router-view />
</template>
