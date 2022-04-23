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

export const Selected = Playground.bind({});
Selected.args = {
  selected: '3',
};

export const Marked = Playground.bind({});
Marked.args = {
  marked: '3',
};

export const Disabled = Playground.bind({});
Disabled.args = {
  disabled: true,
};

export const Votes = Playground.bind({});
Votes.args = {
  results: {
    3: 2,
    5: 1,
  },
};
