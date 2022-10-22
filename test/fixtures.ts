export const buildUser = (id: string | number, vote = '1', voted = !!vote) => ({
  name: `user${id}`,
  vote,
  voted,
});

export const buildUsers = (voted = false, length = 3) =>
  Array.from({ length }, (_, i) => ({
    name: `user${i}`,
    voted,
    vote: '1',
  }));
