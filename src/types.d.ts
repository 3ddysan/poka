import { z } from 'zod';
import { UserValidator, ResultsValidator, StateValidator } from '@/validation';

export type User = z.infer<typeof UserValidator>;
export type Results = z.infer<typeof ResultsValidator>;
export type StateEvent = z.infer<typeof StateValidator>;

export interface Store {
  name: string;
  vote: string;
  users: User[];
  results: Results;
  spectate: boolean;
  error: boolean;
}
