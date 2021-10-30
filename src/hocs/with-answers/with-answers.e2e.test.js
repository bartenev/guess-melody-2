import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAnswers from "./with-answers";

configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const MockComponentWrapped = withAnswers(MockComponent);

it(`No answer selected by default`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().userAnswers).toEqual([false, false, false, false]);
});
