import type { Meta, StoryObj } from '@storybook/vue3';
import Toggle from '@/components/common/Toggle.vue';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args, checked: ref(args.modelValue) };
    },
    template: `<Toggle
        v-model="checked"
        v-bind="args"
      />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
