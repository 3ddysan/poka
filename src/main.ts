import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from './plugins/pinia';
import { createRouter } from './plugins/router';
import 'virtual:windi.css';

createApp(App)
  .directive('focus', {
    mounted: (el) => el.focus(),
  })
  .use(pinia)
  .use(createRouter())
  .mount('#app');
