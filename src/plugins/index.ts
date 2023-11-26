import type { App } from 'vue';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import '@/themes.css';
import { createPinia } from '@/plugins/pinia';
import { createRouter } from '@/plugins/router';
import { createFloatingElements } from '@/plugins/floating';
import { createInternationalization } from '@/plugins/i18n';

const router = createRouter();

export function usePlugins(app: App): App {
  app
    .use(createFloatingElements())
    .use(createPinia(router))
    .use(router)
    .use(createInternationalization());
  return app;
}
