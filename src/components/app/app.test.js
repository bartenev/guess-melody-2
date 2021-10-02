import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      gameTime={5}
      errorCount={6}
    />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});

