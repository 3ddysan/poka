import type { Fn } from '@vueuse/core';

const uniqueId = () => Math.random().toString(36).substring(2, 15);

const EVENT_KEY = 'poka_event_bridge';
const NEW_TAB_EVENT = `new-tab-${uniqueId()}`;
const EXISTING_TAB_EVENT = `existing-tab-${uniqueId()}`;
const CLOSE_TAB_EVENT = `close-tab-${uniqueId()}`;

export interface DetectParallelInstanceComposable {
  closeOther: Fn;
}

export function useDetectParallelInstance(
  onParallelInstance: Fn,
  onClose: Fn,
): DetectParallelInstanceComposable {
  localStorage.setItem(EVENT_KEY, NEW_TAB_EVENT);
  useEventListener(window, 'storage', ({ key, newValue }) => {
    if (key !== EVENT_KEY) return;
    if (newValue?.startsWith('new-tab-')) {
      localStorage.setItem(EVENT_KEY, EXISTING_TAB_EVENT);
    } else if (newValue?.startsWith('existing-tab-')) {
      onParallelInstance();
    } else if (newValue !== CLOSE_TAB_EVENT) {
      onClose();
    }
  });
  const closeOther = () => {
    localStorage.setItem(EVENT_KEY, CLOSE_TAB_EVENT);
  };
  return { closeOther };
}

export function useIntervalFnInBackground(cb: Fn) {
  const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(
    cb,
    3000,
    {
      immediate: false,
    },
  );

  const { pause, resume } = watchPausable(
    useDocumentVisibility(),
    (current, previous) => {
      if (current === 'hidden' && previous === 'visible') {
        resumeInterval();
      } else {
        pauseInterval();
      }
    },
    { immediate: false },
  );

  return {
    resume,
    pause: () => {
      pause();
      pauseInterval();
    },
  };
}
