import Board from '../components/Board.vue';

export default {
  title: 'Board',
  component: Board,
  argTypes: {
    // onClick: {},
  },
};

const Template = (args, { argTypes }) => ({
  components: { Board },
  props: Object.keys(argTypes),
  template: '<Board v-bind="$props"></Board>',
});

export const Empty = Template.bind({});
Empty.args = {};
