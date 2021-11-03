import NameSpace from "../name-spaces";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((it) => it.type === `genre`)
);

const randomFilter = (_state) => {
  return Math.random() > 0.5;
};

export const getArtisQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => resultTwo && it.type === `artist`);
    }
);
