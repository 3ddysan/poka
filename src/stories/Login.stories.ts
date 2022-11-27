import type { Meta, StoryObj } from '@storybook/vue3';
import Login from '@/components/Login.vue';

export default {
  component: Login,
  render: (args) => ({
    components: { Login },
    setup() {
      return { args };
    },
    template: `<Login
        v-bind="args"
        @login="args.login"
        @spectate="args.spectate"
      />`,
  }),
  argTypes: {
    login: { action: 'login' },
    spectate: { action: 'spectate' },
  },
} as Meta<typeof Login>;

export const Playground: StoryObj<typeof Login> = {};
