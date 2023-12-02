import type { Meta, StoryObj } from '@storybook/vue3';
import UserList from '@/components/UserList.vue';

const meta: Meta<typeof UserList> = {
  component: UserList,
  render: (args) => ({
    components: { UserList },
    setup() {
      return { args };
    },
    template: `<UserList v-bind="args">
      </UserList>`,
  }),
  args: {
    userName: 'Joe',
    mode: 'voting',
    users: [
      { name: 'Ted', vote: '', voted: false, spectate: false },
      { name: 'Joe', vote: '1', voted: true, spectate: false },
      { name: 'Bob', vote: '', voted: false, spectate: false },
    ],
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['voting', 'ready', 'results'],
    },
    users: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
