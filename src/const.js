export const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`,
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const MAX_MISTAKES_COUNT = 3;

export const MAX_TIME = 300;

export const GameOverType = {
  MAX_MISTAKES: `MAX_MISTAKES`,
  MAX_TIME: `MAX_TIME`,
};
