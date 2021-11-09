import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer";
import App from "./components/app/app";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createApi} from "./api";
import {Operations} from "./reducer/data/data";
import {BrowserRouter} from "react-router-dom";
import {ActionCreator} from "./reducer/user/user";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {AppRoute} from "./const";

const history = createBrowserHistory();

const init = () => {
  const settings = {
    gameTime: 5,
  };

  const onUnauthorized = () => {
    store.dispatch(ActionCreator.requireAuthorization(true));
  };

  const api = createApi(() => history.push(AppRoute.LOGIN));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operations.loadQuestions);

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App
            gameTime={settings.gameTime}
          />
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
