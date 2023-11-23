import type { Meta, StoryObj } from '@storybook/vue3';
import Toggle from '@/components/common/Toggle.vue';

type Story = StoryObj<typeof Toggle>;

export default {
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
} satisfies Meta<typeof Toggle>;

export const Playground: Story = {};
