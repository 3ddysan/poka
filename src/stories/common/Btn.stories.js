import Btn from '@/components/common/Btn.vue';

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
  components: { Btn },
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
