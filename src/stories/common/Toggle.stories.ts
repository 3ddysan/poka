import type { Meta, StoryObj } from '@storybook/vue3';
import Toggle from '@/components/common/Toggle.vue';

export default {
  component: Toggle,
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { checked: ref(args.modelValue) };
    },
    template: `<Toggle
        v-model="checked"
        v-bind="args"
      />`,
  }),
} as Meta<typeof Toggle>;

export const Playground = {};
