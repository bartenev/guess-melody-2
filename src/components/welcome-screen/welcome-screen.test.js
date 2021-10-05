import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`RenderWelcomeScreen`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      time={4}
      errorCount={6}
      onStartButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
