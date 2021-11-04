import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withAnswers = (Component) => {
  class WithAnswers extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswers: [false, false, false, false],
      };

      this._onAnswer = this._onAnswer.bind(this);
    }

    render() {
      const {userAnswers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={userAnswers}
          changeAnswers={(index, value) => {
            this.setState({
              userAnswers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)],
            });
          }}
          onAnswer={this._onAnswer}
        />
      );
    }

    _onAnswer() {
      const {question, onAnswer} = this.props;
      onAnswer(question, this.state.userAnswers);

      this.setState({
        userAnswers: [false, false, false, false],
      });
    }
  }

  WithAnswers.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
  };

  return WithAnswers;
};

export default withAnswers;
