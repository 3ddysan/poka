import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import App from './App.vue';
import { createPinia } from './plugins/pinia';
import { createRouter } from './plugins/router';
import { createFloatingElements } from './plugins/floating';
import { createInternationalization } from './plugins/i18n';

const router = createRouter();

createApp(App)
  .use(createFloatingElements())
  .use(createPinia(router))
  .use(router)
  .use(createInternationalization())
  .mount('#app');
