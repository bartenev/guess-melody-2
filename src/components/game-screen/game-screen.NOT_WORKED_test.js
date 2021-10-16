import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen";
import {GameType} from "../../const";

const children = <div className="children-component" />;

describe(`GameScreen is rendered correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.ARTIST}
          mistakes={1}
        >
          {children}
        </GameScreen>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.GENRE}
          mistakes={1}
        >
          {children}
        </GameScreen>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
