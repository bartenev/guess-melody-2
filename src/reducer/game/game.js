import {extend, GameType, MAX_MISTAKES_COUNT, MAX_TIME} from "../../const";

const initialState = {
  mistakes: 0,
  maxMistakes: MAX_MISTAKES_COUNT,
  step: -1,
  timer: MAX_TIME,
  maxTimer: MAX_TIME,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  DECREMENT_TIMER: `DECREMENT_TIMER`,
  RESET_GAME: `RESET_GAME`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  decrementTimer: () => {
    return {
      type: ActionType.DECREMENT_TIMER,
      payload: 1,
    };
  },

  resetGame: () => ({
    type: ActionType.RESET_GAME,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.DECREMENT_TIMER:
      if (state.timer <= 0) {
        return extend({}, initialState);
      }

      return extend(state, {
        timer: state.timer - action.payload,
      });

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};

export {reducer, ActionType, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect};
