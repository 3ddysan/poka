import { type RenderOptions, fireEvent } from '@testing-library/vue';
import Card from '@/components/Card.vue';

const value = 'V';
const render = (options?: RenderOptions) =>
  mount(Card, { slots: { default: value }, ...options });

describe('Card', () => {
  test('should render value', () => {
    const { getByTestId } = render();

    expect(getByTestId('card-top-value')).toHaveTextContent(value);
    expect(getByTestId('card-value')).toHaveTextContent(value);
    expect(getByTestId('card-bottom-value')).toHaveTextContent(value);
  });

  test('should render votes', () => {
    const votes = 10;
    const { getByTestId } = render({
      props: {
        votes,
      },
    });

    expect(getByTestId('card-votes')).toHaveTextContent(votes.toString());
  });

  test('should emit click', async () => {
    const { getByTestId, emitted } = render();

    await fireEvent.click(getByTestId('card-action'));

    expect(emitted().click).toEqual([[]]);
  });
});
