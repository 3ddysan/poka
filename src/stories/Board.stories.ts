import type { Meta, StoryObj } from '@storybook/vue3';
import Board from '@/components/Board.vue';

const meta: Meta<typeof Board> = {
  component: Board,
  render: (args) => ({
    components: { Board },
    setup() {
      return {
        args,
      };
    },
    template: `<Board
        v-bind="args"
      />`,
  }),
  argTypes: {
    selected: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    selected: '3',
  },
};

export const Marked: Story = {
  args: {
    marked: '3',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Votes: Story = {
  args: {
    results: {
      3: 2,
      5: 1,
    },
  },
};
