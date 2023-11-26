import { createApp } from 'vue';
import App from './App.vue';
import { usePlugins } from '@/plugins';

usePlugins(createApp(App)).mount('#app');
