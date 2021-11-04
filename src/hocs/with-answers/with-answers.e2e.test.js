import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAnswers from "./with-answers";

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
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

const MockComponent = () => <div />;
const MockComponentWrapped = withAnswers(MockComponent);

it(`No answer selected by default`, () => {
  const {question} = mock;
  const wrapper = shallow(
      <MockComponentWrapped
        onAnswer={() => {}}
        question={question}
      />
  );

  expect(wrapper.state().userAnswers).toEqual([false, false, false, false]);
});
