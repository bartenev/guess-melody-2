import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen";

const question = {
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
};

it(`GenreQuestionScreen is rendered correctly`, () => {
  const changeAnswers = jest.fn();
  const renderAnswer = jest.fn();
  const userAnswers = [true, false, true, true];

  const tree = renderer
    .create((
      <GenreQuestionScreen
        onAnswer={() => {}}
        question={question}
        changeAnswers={changeAnswers}
        renderAnswer={renderAnswer}
        userAnswers={userAnswers}
      />
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
