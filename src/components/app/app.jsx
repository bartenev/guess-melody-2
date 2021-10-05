import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";

class App extends PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {gameTime, errorCount} = props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onUserAnswer}
      />;
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case GameType.GENRE: return (
        <GenreQuestionScreen
          question={currentQuestion}
          onAnswer={onUserAnswer}
        />
      );

      case GameType.ARTIST: return (
        <ArtistQuestionScreen
          question={currentQuestion}
          onAnswer={onUserAnswer}
        />
      );
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  render() {
    // const {gameTime, errorCount, questions} = this.props;
    const {question} = this.state;

    return App.getScreen(question, this.props, () => {
      this.setState((prevState) => ({
        question: prevState.question + 1,
      }));
    });
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
