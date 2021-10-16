import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import App from "./components/app/app";

const init = () => {
  const settings = {
    gameTime: 5,
  };

  const store = createStore(reducer);

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
