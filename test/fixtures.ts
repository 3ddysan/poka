const buildName = (id: string | number, prefix: string) =>
  typeof id === 'number' ? `${prefix}${id}` : id;

export const VOTE = '1';
export const NO_VOTE = '';

export const buildUser = (
  id: string | number = 'user',
  vote = VOTE,
  voted = !!vote,
) => ({
  name: buildName(id, 'user'),
  vote,
  voted,
  spectate: false,
});

export const buildSpectator = (id: string | number = '') => ({
  name: buildName(id, 'spectator'),
  vote: NO_VOTE,
  voted: false,
  spectate: true,
});

export const buildUsers = (voted = false, length = 3) =>
  Array.from({ length }, (_, i) => buildUser(i, voted ? VOTE : NO_VOTE));
