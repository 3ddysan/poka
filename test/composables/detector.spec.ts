import { useDetectParallelInstance } from '@/composables/detector';

const EVENT_KEY = 'poka_event_bridge';

describe('detector', () => {
  const onParallelInstance = vi.fn();
  const onClose = vi.fn();
  const useComposable = () =>
    useDetectParallelInstance(onParallelInstance, onClose);
  function dispatchStorageEvent(key: string, newValue: string) {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue,
      }),
    );
  }

  test('should broadcast signal for detection', () => {
    useComposable();

    dispatchStorageEvent(EVENT_KEY, 'new-tab-test');

    expect(localStorage.getItem(EVENT_KEY)).toEqual(
      expect.stringContaining('existing-tab-'),
    );
  });

  test('should detect other instance by signal', () => {
    useComposable();

    dispatchStorageEvent(EVENT_KEY, 'existing-tab-test');

    expect(onParallelInstance).toHaveBeenCalled();
  });

  test('should close instance', () => {
    useComposable();

    dispatchStorageEvent(EVENT_KEY, 'close-tab-test');

    expect(onClose).toHaveBeenCalled();
  });
});
