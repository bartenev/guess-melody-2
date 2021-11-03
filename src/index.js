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

const init = () => {
  const settings = {
    gameTime: 5,
  };

  const api = createApi((...args) => store.dispatch(...args));

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
        <App
          gameTime={settings.gameTime}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
