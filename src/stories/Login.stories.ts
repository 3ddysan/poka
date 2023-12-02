import type { Meta, StoryObj } from '@storybook/vue3';
import Login from '@/components/Login.vue';

const meta: Meta<typeof Login> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
