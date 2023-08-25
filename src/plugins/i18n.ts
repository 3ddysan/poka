import { type Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

const { language } = useNavigatorLanguage();
const params = useUrlSearchParams('history');
const queryLang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
const locale = queryLang || language.value?.split('-')[0] || 'en';

export const createInternationalization = (): Plugin => {
  return {
    install(app) {
      app.use(
        createI18n({
          legacy: false,
          locale,
          messages: {
            en: {},
            de: {},
          },
        }),
      );
    },
  };
};
