import Card from '../components/Card.vue';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    click: { action: 'click' },
    default: {
      defaultValue: '10',
    },
  },
};

export const Playground = (args) => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: `<Card 
      v-bind="args"
      @click="args.click"
    >
        <template v-if="${'default' in args}" v-slot>${args.default}</template>
    </Card>`,
});

export const Selected = Playground.bind({});
Selected.args = {
  selected: true,
};

export const Marked = Playground.bind({});
Marked.args = {
  mark: true,
};

export const Disabled = Playground.bind({});
Disabled.args = {
  disabled: true,
};

export const Votes = Playground.bind({});
Votes.args = {
  votes: 3,
};
