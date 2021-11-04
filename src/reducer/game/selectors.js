import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.GAME;

export const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export const getMistakes = (state) => {
  return state[NAME_SPACE].mistakes;
};

export const getTimer = (state) => {
  return state[NAME_SPACE].timer;
};

export const getMaxTimer = (state) => {
  return state[NAME_SPACE].maxTimer;
};


export const getMaxMistakes = (state) => {
  return state[NAME_SPACE].maxMistakes;
};
