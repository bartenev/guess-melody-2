import {extend} from "../../const";

const initialState = {
  isAuthorizationRequired: true,
  loginInfo: {
    id: null,
    email: null,
    password: null,
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  login: (data) => ({
    type: ActionType.LOGIN,
    payload: data,
  }),
};

const Operations = {
  login: (dispatch, _getState, api, email, password) => {
    return api.post(`/login`, {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.login(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.LOGIN:
      return extend(state, {
        loginInfo: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
