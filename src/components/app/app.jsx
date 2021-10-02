import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import PropTypes from "prop-types";

const welcomeButtonHandler = () => {};
const App = (props) => {
  const {gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onWelcomeButtonClick={welcomeButtonHandler}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default App;
