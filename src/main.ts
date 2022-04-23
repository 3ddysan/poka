import { createApp } from 'vue';
import App from './App.vue';
import { router } from './plugins/router';
import { pinia } from './plugins/pinia';
import 'virtual:windi.css';

createApp(App)
  .directive('focus', {
    mounted: (el) => el.focus(),
  })
  .use(pinia)
  .use(router)
  .mount('#app');
