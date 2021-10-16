import {extend, GameType, MAX_MISTAKES_COUNT, MAX_TIME} from "./const";
import questions from "./mocks/questions";

const initialState = {
  mistakes: 0,
  step: -1,
  timer: MAX_TIME,
  questions,
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
  }

  // resetGame: () => ({
  //   type: ActionType.RESET_GAME,
  // }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return extend({}, initialState);
      }

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:
      if (state.step > -1) {
        const mistakes = state.mistakes + action.payload;

        if (mistakes >= MAX_MISTAKES_COUNT) {
          return extend({}, initialState);
        }
        return extend(state, {
          mistakes: state.mistakes + action.payload,
        });
      }
      break;

    case ActionType.DECREMENT_TIMER:
      if (state.timer <= 0) {
        return extend({}, initialState);
      }

      return extend(state, {
        timer: state.timer - action.payload,
      });

    // case ActionType.RESET_GAME:
    //   return extend({}, initialState);
  }

  return state;
};

export {reducer, ActionType, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect};
