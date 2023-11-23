import type { z } from 'zod';
import type {
  ResultsValidator,
  StateValidator,
  UserValidator,
} from '@/validation';

export type User = z.infer<typeof UserValidator>;
export type Results = z.infer<typeof ResultsValidator>;
export type StateEvent = z.infer<typeof StateValidator>;

export interface StoreState {
  name: string;
  vote: string;
  users: User[];
  results: Results;
  error: 'server' | 'name' | null;
}

export type Mode = 'results' | 'voting' | 'ready' | 'login';
