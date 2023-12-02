import type { Meta, StoryObj } from '@storybook/vue3';
import Modal from '@/components/common/Modal.vue';

const meta: Meta<typeof Modal> = {
  component: Modal,
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `Background
      <Modal
        v-model="args.modelValue"
        v-bind="args"
      >
        {{ args.default }}
        <template #actions>
          <button>Close</button>
        </template>
      </Modal>`,
  }),
  args: {
    title: 'Title',
    modelValue: true,
    default: 'Text',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
