import { createPinia } from 'pinia';
import { createSSEPlugin } from './sse';

export const pinia = createPinia().use(createSSEPlugin());
