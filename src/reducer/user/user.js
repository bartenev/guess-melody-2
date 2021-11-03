import {extend} from "../../const";

const initialState = {
  isAuthorizationRequired: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
