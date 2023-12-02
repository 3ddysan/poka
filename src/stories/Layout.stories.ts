import type { Meta, StoryObj } from '@storybook/vue3';
import Layout from '@/components/Layout.vue';
import Board from '@/components/Board.vue';
import UserList from '@/components/UserList.vue';

const meta: Meta<typeof Layout> = {
  component: Layout,
  render: (args) => ({
    components: { Layout, Board, UserList },
    setup() {
      return {
        args,
      };
    },
    template: `
      <Layout style="width: 90vw;">
          <template #main>
              <Board />
          </template>
          <template #sidebar>
              <UserList />
          </template>
      </Layout>
      `,
  }),
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
