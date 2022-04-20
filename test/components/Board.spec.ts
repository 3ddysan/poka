import { mount } from '@vue/test-utils';
import Board from '@/components/Board.vue';

describe.skip('Board', () => {
  it('should render', () => {
    const wrapper = mount(Board);
    expect(wrapper.text()).toContain('tbd');
  });
});
