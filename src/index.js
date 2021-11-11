import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer";
import App from "./components/app/app";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createApi} from "./api";
import {Operations as DataOperations} from "./reducer/data/data";
import {Operations as UserOperations} from "./reducer/user/user";
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user";


const init = () => {
  const settings = {
    gameTime: 5,
  };

  const onUnauthorized = () => {
    store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  };

  const api = createApi(onUnauthorized);

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(DataOperations.loadQuestions);
  store.dispatch(UserOperations.checkAuth());

  ReactDOM.render(
      <Provider store={store}>
        <App
          gameTime={settings.gameTime}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
