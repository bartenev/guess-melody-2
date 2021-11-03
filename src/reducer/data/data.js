import {extend} from "../../const";

const initialState = {
  questions: [],
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),
};

const Operations = {
  loadQuestions: (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        console.log(response.data);
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return extend(state, {
        questions: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
