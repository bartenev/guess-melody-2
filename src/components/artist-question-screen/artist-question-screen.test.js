import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen";

const question = {
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
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(
      <ArtistQuestionScreen
        onAnswer={() => {}}
        question={question}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

