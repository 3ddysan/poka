import type { Meta, StoryObj } from '@storybook/vue3';
import UserList from '@/components/UserList.vue';

export default {
  component: UserList,
  render: (args) => ({
    components: { UserList },
    setup() {
      return { args };
    },
    template: `<UserList
        v-bind="args"
        @show-results="args['show-results']"
        @reset-results="args['reset-results']"
        @logout="args.logout"
      >
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
    'show-results': { action: 'show-results' },
    'reset-results': { action: 'reset-results' },
    logout: { action: 'logout' },
    mode: {
      control: 'select',
      options: ['voting', 'ready', 'results'],
    },
    users: {
      control: 'object',
    },
  },
} as Meta<typeof UserList>;

export const Playground: StoryObj<typeof UserList> = {};
