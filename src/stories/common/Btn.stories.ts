import type { Meta, StoryObj } from '@storybook/vue3';
import Btn from '@/components/common/Btn.vue';
import IconAbacus from '~icons/mdi/abacus';

type Story = StoryObj<typeof Btn>;

export default {
  component: Btn,
  render: (args) => ({
    components: { Btn, IconAbacus },
    setup() {
      return { args };
    },
    template: `<Btn
        v-bind="args"
      >
          <template #default>${
            'default' in args ? args.default : null
          }</template>
      </Btn>`,
  }),
  args: {
    default: 'Action',
  },
  argTypes: {
    onClick: { action: 'click' },
    default: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Btn>;

export const Playground: Story = {};

export const Icon: Story = {
  args: {
    default: `<IconAbacus /> Action`,
  },
};
