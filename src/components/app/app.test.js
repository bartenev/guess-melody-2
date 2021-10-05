import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      gameTime={5}
      errorCount={6}
      questions={questions}
    />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});

