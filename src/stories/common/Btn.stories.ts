import type { Meta, StoryObj } from '@storybook/vue3';
import Btn from '@/components/common/Btn.vue';
import IconAbacus from '~icons/mdi/abacus';

export default {
  component: Btn,
  render: (args) => ({
    components: { Btn, IconAbacus },
    setup() {
      return { args };
    },
    template: `<Btn
        v-bind="args"
        @click="args.click"
      >
          <template #default>${
            'default' in args ? args.default : null
          }</template>
      </Btn>`,
  }),
  argTypes: {
    click: { action: 'click' },
    default: {
      control: {
        type: 'text',
      },
      defaultValue: 'Action',
    },
  },
} as Meta<typeof Btn>;

export const Playground = {
  args: {
    default: 'Action',
  },
};

export const Icon = {
  args: {
    default: `<IconAbacus /> Action`,
  },
};