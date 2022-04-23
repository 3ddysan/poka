import Card from '../components/Card.vue';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    click: { action: 'click' },
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

Playground.args = {
  default: '10',
};
