import React from "react";
import renderer from "react-test-renderer";
import {AuthorizationScreen} from "./authorization-screen";

it(`AuthorizationScreen is rendered correctly`, () => {

  const tree = renderer
    .create((
      <AuthorizationScreen
        onReplayButtonClick={() => {}}
        logIn={() => {}}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();


  expect(tree).toMatchSnapshot();
});
