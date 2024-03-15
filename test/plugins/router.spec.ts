import { createMemoryHistory } from 'vue-router';
import { createRouter } from '@/plugins/router';
import { useStore } from '@/stores/state';

vi.mock('@/stores/state');
const stateStoreMock = {
  connected: false,
};
vi.mocked(useStore, { partial: true }).mockReturnValue(stateStoreMock);

let router: ReturnType<typeof createRouter>;

beforeEach(() => {
  router = createRouter(createMemoryHistory());
});

test.each([['/plan'], ['/'], ['/unknown', '/']])(
  'should rout from %s to %s if connected',
  async (path, expectedPath = path) => {
    await router.push({ path });
    await router.isReady();

    expect(router.currentRoute.value.name).toEqual(expectedPath);
  },
);
