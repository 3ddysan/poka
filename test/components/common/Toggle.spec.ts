import { type RenderOptions, screen, fireEvent } from '@testing-library/vue';
import Toggle from '@/components/common/Toggle.vue';

const tooltip = 'TOOLTIP';
const render = ({ props = {}, ...options } = {}) =>
  mount(Toggle, { props: { tooltip, ...props }, ...options });

describe('Toggle', () => {
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
