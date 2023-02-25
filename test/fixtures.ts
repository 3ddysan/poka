const buildName = (id: string | number, prefix: string) =>
  typeof id === 'number' ? `${prefix}${id}` : id;

export const VOTE = '1';
export const NO_VOTE = '';

const PREFIX_USER = 'user';
const PREFIX_SPECTATOR = 'spectator';

export const buildUser = (
  id: string | number = PREFIX_USER,
  vote = VOTE,
  voted = !!vote,
) => ({
  name: buildName(id, PREFIX_USER),
  vote,
  voted,
  spectate: false,
});

export const buildSpectator = (id: string | number = PREFIX_SPECTATOR) => ({
  name: buildName(id, PREFIX_SPECTATOR),
  vote: NO_VOTE,
  voted: false,
  spectate: true,
});

export const buildUsers = (voted = false, length = 3) =>
  Array.from({ length }, (_, i) => buildUser(i, voted ? VOTE : NO_VOTE));

export const mockIsNameTaken = (isTaken = false) => {
  vi.mocked(useFetch, { partial: true }).mockReturnValueOnce({
    statusCode: ref(isTaken ? 204 : 400),
  });
};
