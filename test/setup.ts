import '@testing-library/jest-dom';
import { setActivePinia } from 'pinia';
import { pinia } from '@/plugins/pinia';

beforeEach(() => {
  setActivePinia(pinia);
});
