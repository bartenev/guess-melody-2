import React, {PureComponent} from "react";

const withAnswers = (Component) => {
  class WithAnswers extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswers: [false, false, false, false],
      };
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
        />
      );
    }
  }

  WithAnswers.propTypes = {};

  return WithAnswers;
};

export default withAnswers;
