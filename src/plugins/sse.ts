import type { PiniaPlugin } from 'pinia';
import type { Ref } from 'vue';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    sse?: string[];
  }
  export interface PiniaCustomProperties {
    connect: (name: string) => void;
    disconnect: () => void;
    connected: Ref<boolean | undefined>;
  }
}

export function createSSEPlugin(): PiniaPlugin {
  return ({ options: { sse }, store }) => {
    if (!sse) return;
    let eventSource: EventSource | undefined;
    const connected = ref<boolean | undefined>(false);
    return {
      connect(url: string) {
        eventSource = new EventSource(url);
        eventSource.onopen = () => {
          connected.value = true;
        };
        eventSource.onerror = () => {
          connected.value = undefined;
        };
        sse.forEach((event) => {
          eventSource?.addEventListener(event, ({ data }) => {
            store[event]?.(data);
          });
        });
      },
      disconnect() {
        eventSource?.close();
        connected.value = false;
      },
      connected,
    };
  };
}
