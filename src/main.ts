import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from './plugins/pinia';
import { createRouter } from './plugins/router';
import 'virtual:windi.css';
import { createI18n } from 'vue-i18n';

const { language } = useNavigatorLanguage();
const params = useUrlSearchParams('history');
const queryLang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
const locale = queryLang || language.value?.split('-')[0] || 'en';
const router = createRouter();
createApp(App)
  .use(createPinia(router))
  .use(router)
  .use(
    createI18n({
      legacy: false,
      locale,
      messages: {
        en: {},
        de: {},
      },
    }),
  )
  .mount('#app');
