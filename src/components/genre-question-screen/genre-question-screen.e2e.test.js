import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";

configure({
  adapter: new Adapter(),
});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      }
    ]
  }
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const changeAnswers = jest.fn();
  const renderAnswer = jest.fn();
  const userAnswers = [true, false, true, true];

  const genreQuestion = shallow(
      <GenreQuestionScreen
        onAnswer={onAnswer}
        question={question}
        changeAnswers={changeAnswers}
        renderAnswer={renderAnswer}
        userAnswers={userAnswers}
      />
  );

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

// it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
//   const {question} = mock;
//   const onAnswer = jest.fn((...args) => [...args]);
//   const changeAnswers = jest.fn();
//   const renderAnswer = jest.fn();
//   const userAnswers = [false, true, false, false];
//
//   const genreQuestion = shallow(
//       <GenreQuestionScreen
//         onAnswer={onAnswer}
//         question={question}
//         changeAnswers={changeAnswers}
//         renderAnswer={renderAnswer}
//         userAnswers={userAnswers}
//       />
//   );
//
//   const form = genreQuestion.find(`form`);
//   const inputTwo = genreQuestion.find(`input`).at(1);
//
//   inputTwo.simulate(`change`, {target: {checked: true}});
//   form.simulate(`submit`, {preventDefault() {}});
//
//   expect(onAnswer).toHaveBeenCalledTimes(1);
//
//   expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
//   expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswers);
//
//   expect(
//       genreQuestion.find(`input`).map((it) => it.prop(`checked`))
//   ).toEqual(userAnswers);
// });
