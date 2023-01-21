import { type RenderOptions, screen, fireEvent } from '@testing-library/vue';
import Mode from '@/components/common/Mode.vue';

const render = (options?: RenderOptions) => mount(Mode, options);

describe('Mode', () => {
  test.each([[false], [true]])(
    'should render checked=%s',
    async (modelValue) => {
      render({ props: { modelValue } });
      const matcher = expect(screen.getByTestId('mode-action'));

      (modelValue ? matcher : matcher.not).toBeChecked();
    },
  );

  test('should check', async () => {
    const { emitted } = render();

    await fireEvent.update(screen.getByTestId('mode-action'));

    expect(emitted()['update:modelValue']).toEqual([[true]]);
  });
});
