import type { Meta, StoryObj } from '@storybook/vue3';
import Modal from '@/components/common/Modal.vue';

type Story = StoryObj<typeof Modal>;

export default {
  component: Modal,
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args, isOpen: ref(args.modelValue) };
    },
    template: `Background
      <Modal
        v-model="isOpen"
        v-bind="args"
      >
        {{ args.content }}
        <template #actions>
          <button>Close</button>
        </template>
      </Modal>`,
  }),
  args: {
    title: 'Title',
    modelValue: true,
    content: 'Text',
  },
} as Meta<typeof Modal>;

export const Playground = {};
