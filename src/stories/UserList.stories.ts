import type { Meta, StoryObj } from '@storybook/vue3';
import UserList from '@/components/UserList.vue';

type Story = StoryObj<typeof UserList>;

export default {
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
    onShowResults: { action: 'show-results' },
    onResetResults: { action: 'reset-results' },
    onLogout: { action: 'logout' },
    onKick: { action: 'kick' },
    mode: {
      control: 'select',
      options: ['voting', 'ready', 'results'],
    },
    users: {
      control: 'object',
    },
  },
} satisfies Meta<typeof UserList>;

export const Playground: Story = {};
