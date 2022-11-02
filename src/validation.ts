import { z } from 'zod';

export const UserValidator = z.object({
  name: z.string(),
  vote: z.string(),
  voted: z.boolean(),
  spectate: z.boolean(),
});

export const ResultsValidator = z.record(z.string(), z.number()).nullable();

export const StateValidator = z.object({
  users: z.array(UserValidator),
  results: ResultsValidator,
});
