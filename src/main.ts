import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from './plugins/pinia';
import { createRouter } from './plugins/router';
import 'virtual:windi.css';
import { createI18n } from 'vue-i18n';

const router = createRouter();
createApp(App)
  .use(createPinia(router))
  .use(router)
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
