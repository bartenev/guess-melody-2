import React from "react";
import renderer from "react-test-renderer";
import GameOverScreen from "./game-over-screen";
import {GameOverType} from "../../const";

it(`GameOverScreen is rendered correctly`, () => {

  const tree = renderer
    .create((
      <GameOverScreen
        onReplayButtonClick={() => {}}
        type={GameOverType.MAX_MISTAKES}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();


  expect(tree).toMatchSnapshot();
});
