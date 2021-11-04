import React from "react";
import renderer from "react-test-renderer";
import WinScreen from "./win-screen";

it(`WinScreen is rendered correctly`, () => {

  const tree = renderer
    .create((
      <WinScreen
        time={123}
        mistakes={3}
        points={12}
        onReplayButtonClick={() => {}}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();


  expect(tree).toMatchSnapshot();
});
