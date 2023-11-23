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
        selection: ref(args.selected),
      };
    },
    template: `<Board
        v-model:selected="selection"
        :results="args.results"
        :marked="args.marked"
        :disabled="args.disabled"
        @update:selected="args['update:selected']"
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
