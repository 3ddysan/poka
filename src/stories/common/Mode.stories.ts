import type { Meta, StoryObj } from '@storybook/vue3';
import Mode from '@/components/common/Mode.vue';

export default {
  component: Mode,
  render: (args) => ({
    components: { Mode },
    setup() {
      return { checked: ref(args.modelValue) };
    },
    template: `<Mode
        v-model="checked"
        v-bind="args"
      />`,
  }),
} as Meta<typeof Mode>;

export const Playground = {};
