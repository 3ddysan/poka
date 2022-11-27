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
  argTypes: {
    'show-results': { action: 'show-results' },
    'reset-results': { action: 'reset-results' },
    logout: { action: 'logout' },
    userName: {
      defaultValue: 'Joe',
    },
    mode: {
      control: 'select',
      options: ['voting', 'ready', 'results'],
      defaultValue: 'voting',
    },
    users: {
      control: 'object',
      defaultValue: [
        { name: 'Ted', vote: '', voted: false },
        { name: 'Joe', vote: '1', voted: true },
        { name: 'Bob', vote: '', voted: false },
      ],
    },
  },
} as Meta<typeof UserList>;

export const Playground: StoryObj<typeof UserList> = {};
