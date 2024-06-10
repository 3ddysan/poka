import { fireEvent } from '@testing-library/vue';
import Board from '@/components/Board.vue';

const values = ['0', '1', '2', '3', '5', '8', '13', '20', '?', '☕'] as const;
const render = () => mount(Board);

describe('Board', () => {
  test('should render', () => {
    const { getAllByTestId } = render();
    expect(getAllByTestId('card')).toHaveLength(10);
  });

  test.each(Array.from(values, (v, i) => [v, i]))(
    'should trigger selection event with %s',
    async (value, index) => {
      const { getAllByTestId, emitted } = render();
      await fireEvent.click(getAllByTestId('card-action')[index]);

      expect(emitted()['update:selected']).toEqual([[value]]);
    },
  );
});
