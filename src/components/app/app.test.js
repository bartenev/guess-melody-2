import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-spaces";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Provider} from "react-redux";
import {MAX_MISTAKES_COUNT, MAX_TIME} from "../../const";
import {Router} from "react-router-dom";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [
      {
        picture: `https://lh3.googleusercontent.com/proxy/ELVSk8lMwUNadyXt60N3ckhwjkObTuF7QRCCk5SkhsdUfw7aUO_tFB2XEz99xPS5wePQ9Ey3H6aYGyCAScZbO_1vm6igY_WmCoPkojjNIbdLWOYgbNRPV1xY2h5a5dYL2AWZkt1NM57BkGnBixfw89nTmJSEFsvQvdfgVB-ug4incD1Qe3NUj74`,
        artist: `John Snow`,
      },
      {
        picture: `https://lh3.googleusercontent.com/proxy/ELVSk8lMwUNadyXt60N3ckhwjkObTuF7QRCCk5SkhsdUfw7aUO_tFB2XEz99xPS5wePQ9Ey3H6aYGyCAScZbO_1vm6igY_WmCoPkojjNIbdLWOYgbNRPV1xY2h5a5dYL2AWZkt1NM57BkGnBixfw89nTmJSEFsvQvdfgVB-ug4incD1Qe3NUj74`,
        artist: `Jack Daniels`,
      },
      {
        picture: `https://lh3.googleusercontent.com/proxy/ELVSk8lMwUNadyXt60N3ckhwjkObTuF7QRCCk5SkhsdUfw7aUO_tFB2XEz99xPS5wePQ9Ey3H6aYGyCAScZbO_1vm6igY_WmCoPkojjNIbdLWOYgbNRPV1xY2h5a5dYL2AWZkt1NM57BkGnBixfw89nTmJSEFsvQvdfgVB-ug4incD1Qe3NUj74`,
        artist: `Jim Beam`,
      },
    ]
  },
];

const mockStore = configureStore([]);

it(`App correctly renders first screen`, () => {

  const store = mockStore({
    [NameSpace.GAME]: {
      mistakes: 0,
      maxMistakes: MAX_MISTAKES_COUNT,
      step: -1,
      timer: MAX_TIME,
      maxTimer: MAX_TIME,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userInfo: {
        id: null,
        email: null,
      }
    }
  });

  const tree = renderer
    .create(
        <App
          gameTime={5}
          questions={questions}
          onUserAnswer={jest.fn()}
          onWelcomeScreenClick={jest.fn()}
          step={-1}
          isAuthorizationRequired={false}
          maxMistakes={3}
          maxTimer={300}
          mistakes={0}
          timer={300}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          resetGame={() => {}}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
