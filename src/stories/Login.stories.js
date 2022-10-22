import Login from '../components/Login.vue';

export default {
  title: 'Login',
  component: Login,
  argTypes: {
    login: { action: 'login' },
  },
};

export const Playground = (args) => ({
  components: { Login },
  setup() {
    return { args };
  },
  template: `<Login
      v-bind="args"
      @login="args.login"
    />`,
});
