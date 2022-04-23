import Board from '../components/Board.vue';

export default {
  title: 'Board',
  component: Board,
  argTypes: {
    selected: { control: 'text' },
    'update:selected': { action: 'update:selected' },
  },
};

export const Playground = (args) => ({
  components: { Board },
  setup() {
    return {
      args,
      selection: ref(args.selected),
    };
  },
  template: `<Board 
      v-model:selected="selection" 
      :results="args.results" 
      :marked="args.marked" 
      :disabled="args.disabled"
      @update:selected="args['update:selected']"
    />`,
});
