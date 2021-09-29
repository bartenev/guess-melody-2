import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
  />;
};

export default App;