import Layout from '../components/Layout.vue';
import Board from '../components/Board.vue';
import UserList from '../components/UserList.vue';

export default {
  title: 'Layout',
  component: Layout,
  subcomponents: { Board, UserList },
  argTypes: {},
};

export const Playground = () => ({
  components: { Layout, Board, UserList },
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
});
