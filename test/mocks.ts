export const vueuseModule = async () => {
  const actual = (await vi.importActual(
    '@vueuse/core',
  )) as typeof import('@vueuse/core');
  return {
    ...actual,
    useLocalStorage: vi.fn((_key, defaultValue) => ref(defaultValue)),
    useFetch: vi.fn((_url, options) => {
      return {
        post() {
          options.afterFetch();
        },
        delete() {
          return Promise.resolve();
        },
        statusCode: ref(204),
      };
    }),
  };
};
