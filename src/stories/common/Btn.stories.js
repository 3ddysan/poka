import Btn from '@/components/common/Btn.vue';
import IconAbacus from '~icons/mdi/abacus';

export default {
  title: 'Btn',
  component: Btn,
  argTypes: {
    click: { action: 'click' },
    default: {
      defaultValue: 'Action',
    },
  },
};

export const Playground = (args) => ({
  components: { Btn, IconAbacus },
  setup() {
    return { args };
  },
  template: `<Btn
      v-bind="args"
      @click="args.click"
    >
        <template v-if="${'default' in args}" v-slot>${args.default}</template>
    </Btn>`,
});

export const Icon = Playground.bind({});
Icon.args = {
  default: `<IconAbacus /> Action`,
};
