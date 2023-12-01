import type { Meta, StoryObj } from '@storybook/vue3';
import Login from '@/components/Login.vue';

type Story = StoryObj<typeof Login>;

export default {
  component: Login,
  render: (args) => ({
    components: { Login },
    setup() {
      return { args };
    },
    template: `<Login
        v-bind="args"
        @login="args.onLogin"
        @spectate="args.onSpectate"
      />`,
  }),
} satisfies Meta<typeof Login>;

export const Playground: Story = {};
