import type { Meta, StoryObj } from '@storybook/vue3';
import Card from '../components/Card.vue';

type Story = StoryObj<typeof Card>;

export default {
  component: Card,
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `<Card v-bind="args"><template #default>{{ args.default }}</template></Card>`,
  }),
  args: {
    default: '10',
  },
  argTypes: {
    default: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Card>;

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Marked: Story = {
  args: {
    mark: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Votes: Story = {
  args: {
    votes: 3,
  },
};
