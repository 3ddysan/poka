/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vue-i18n';
