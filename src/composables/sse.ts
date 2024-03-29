import type { Ref } from 'vue';

export interface ServerSentEventComposable {
  connect: (
    url: string,
    events: Record<string, (event: string) => void>,
  ) => Promise<void>;
  disconnect: () => void;
  connected: Ref<boolean>;
}

export function useSSE(): ServerSentEventComposable {
  let eventSource: EventSource | undefined;
  const connected = ref<boolean>(false);
  return {
    connect(url, events) {
      return new Promise((resolve, reject) => {
        eventSource = new EventSource(url);
        Object.entries(events).forEach(([event, fn]) => {
          eventSource?.addEventListener(event, ({ data }) => fn(data));
        });
        eventSource.addEventListener('open', () => {
          connected.value = true;
          resolve();
        });
        eventSource.addEventListener('error', (e) => {
          connected.value = false;
          reject(e);
        });
      });
    },
    disconnect() {
      eventSource?.close();
      connected.value = false;
    },
    connected,
  };
}
