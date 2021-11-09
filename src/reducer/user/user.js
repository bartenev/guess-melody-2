import {extend} from "../../const";

const initialState = {
  isAuthorizationRequired: true,
  userInfo: {
    id: null,
    email: null,
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setUserInfo: (userInfo) => ({
    type: ActionType.SET_USER_INFO,
    payload: userInfo,
  })
};

const Operations = {
  checkAuth: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.setUserInfo(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (authData) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.setUserInfo(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.SET_USER_INFO:
      return extend(state, {
        userInfo: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
