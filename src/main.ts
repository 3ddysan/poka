import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from './plugins/pinia';
import { createRouter } from './plugins/router';
import 'virtual:windi.css';
import { createI18n } from 'vue-i18n';

createApp(App)
  .use(pinia)
  .use(createRouter())
  .use(
    createI18n({
      legacy: false,
      locale: 'en',
      messages: {
        en: {},
        de: {},
      },
    }),
  )
  .mount('#app');
