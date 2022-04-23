import UserList from '../components/UserList.vue';

export default {
  title: 'UserList',
  component: UserList,
  argTypes: {
    'show-results': { action: 'show-results' },
    'reset-results': { action: 'reset-results' },
    logout: { action: 'logout' },
    userName: {
      defaultValue: 'Joe',
    },
    users: {
      control: {
        type: 'array',
      },
      defaultValue: [
        { name: 'Ted', voted: false },
        { name: 'Joe', voted: true },
        { name: 'Bob', voted: false },
      ],
    },
  },
};

export const Playground = (args) => ({
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
});

Playground.args = {};
