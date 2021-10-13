import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import App from "./components/app/app";
import questions from "./mocks/questions";

const init = () => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };

  const store = createStore(reducer);

  ReactDOM.render(
    <Provider store={store}>
      <App
        errorCount={settings.errorCount}
        gameTime={settings.gameTime}
        questions={questions}
      />
    </Provider>,
      document.querySelector(`#root`)
  );
};

init();
