import React from "react";
import renderer from "react-test-renderer";
import {Timer} from "./timer";

it(`Timer rendered correctly`, () => {
  const tree = renderer
    .create(<Timer
      timer={300}
      onTimerTick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
