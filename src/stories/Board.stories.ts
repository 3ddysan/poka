import type { Meta, StoryObj } from '@storybook/vue3';
import Board from '@/components/Board.vue';

type Story = StoryObj<typeof Board>;

export default {
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
} satisfies Meta<typeof Board>;

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
