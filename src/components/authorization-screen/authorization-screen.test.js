import React from "react";
import renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen";

it(`AuthorizationScreen is rendered correctly`, () => {

  const tree = renderer
    .create((
      <AuthorizationScreen
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
