import type { Meta, StoryObj } from '@storybook/vue3';
import Layout from '@/components/Layout.vue';
import Board from '@/components/Board.vue';
import UserList from '@/components/UserList.vue';

export default {
  component: Layout,
  subcomponents: { Board, UserList },
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
} as Meta<typeof Layout>;

export const Playground: StoryObj<typeof Layout> = {};
