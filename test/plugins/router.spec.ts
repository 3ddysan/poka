import { createMemoryHistory, type Router } from 'vue-router';
import { createRouter } from '@/plugins/router';
import { useStateStore } from '@/stores/state';

vi.mock('@/stores/state');
const stateStoreMock = {
  connected: false,
};
vi.mocked(useStateStore, { partial: true }).mockReturnValue(stateStoreMock);

let router: Router;

beforeEach(() => {
  router = createRouter(createMemoryHistory());
});

test('should rout to /plan if connected', async () => {
  stateStoreMock.connected = true;

  await router.push('/plan');
  await router.isReady();

  expect(router.currentRoute.value.name).toEqual('plan');
});

test('should not rout to /plan if not connected', async () => {
  stateStoreMock.connected = false;

  router.push('/plan');
  await router.isReady();

  expect(router.currentRoute.value.name).toEqual('index');
});
