import type { PiniaPlugin, Store } from 'pinia';
import type { Ref } from 'vue';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    sse?: string[];
  }
  export interface PiniaCustomProperties {
    connect: (name: string) => void;
    disconnect: () => void;
    connected: Ref<boolean>;
  }
}

let eventSource: EventSource | undefined;
const connected = ref<boolean>(false);
const subscriptions: Map<string, Record<string, unknown>[]> = new Map();

function addEventListener() {
  if (eventSource == null) return;
  subscriptions.forEach((stores, event) => {
    eventSource?.addEventListener(event, ({ data }) => {
      stores.forEach((s) => {
        const fn = s[event];
        if (typeof fn === 'function') {
          fn(data);
        } else {
          console.warn('Missing handler:', event, data);
        }
      });
    });
  });
}

export function createSSEPlugin(): PiniaPlugin {
  return ({ options: { sse }, store }) => {
    if (sse == null) return;
    sse.forEach((event) => {
      if (subscriptions.has(event)) {
        subscriptions.get(event)?.push(store);
      } else {
        subscriptions.set(event, [store]);
      }
    });
    addEventListener();
    return {
      connect(url: string) {
        eventSource = new EventSource(url);
        eventSource.onopen = () => {
          connected.value = true;
        };
        eventSource.onerror = () => {
          connected.value = false;
        };
        addEventListener();
      },
      disconnect() {
        eventSource?.close();
        connected.value = false;
      },
      connected,
    };
  };
}
