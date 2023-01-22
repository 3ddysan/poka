import { useSSE } from '@/composables/sse';
import exp from 'constants';

let emitError = false;
const EventSourceState = {
  set onopen(fn: any) {
    fn();
  },
  set onerror(fn: any) {
    if (emitError) fn();
  },
  addEventListener: vi.fn((event, fn) => fn({ data: event })),
  close: vi.fn(),
};
const EventSourceMock = vi.fn(() => EventSourceState);
vi.stubGlobal('EventSource', EventSourceMock);

describe('sse', () => {
  const URL = 'url';

  beforeEach(() => {
    emitError = false;
  });
  test('should be connected', async () => {
    const { connect, connected } = useSSE();

    await connect(URL, {});

    expect(EventSourceMock).toHaveBeenCalledWith(URL);
    expect(connected.value).toBeTruthy();
  });

  test('should not be connected on error', async () => {
    emitError = true;
    const { connect, connected } = useSSE();

    await connect(URL, {});

    expect(connected.value).toBeFalsy();
  });

  test('should emit events to listeners', async () => {
    const event = 'event';
    const listeners = {
      [event]: vi.fn(),
    };
    const { connect } = useSSE();

    await connect(URL, listeners);

    expect(listeners.event).toBeCalledWith(event);
  });

  test('should close connection on disconnect', async () => {
    const { connect, disconnect, connected } = useSSE();

    await connect(URL, {});
    disconnect();

    expect(EventSourceState.close).toHaveBeenCalled();
    expect(connected.value).toBeFalsy();
  });
});
