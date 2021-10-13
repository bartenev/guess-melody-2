import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";

class App extends PureComponent {
  static getScreen(props) {
    const {gameTime, errorCount, questions, question, onUserAnswer, mistakes} = props;

    if (question === -1 || question >= questions.length) {
      return (
        <WelcomeScreen
          time={gameTime}
          errorCount={errorCount}
          onStartButtonClick={onUserAnswer}
        />
      );
    }

    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case GameType.GENRE: return (
        <GameScreen
          type={GameType.GENRE}
          mistakes={mistakes}
        >
          <GenreQuestionScreen
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        </GameScreen>
      );

      case GameType.ARTIST: return (
        <GameScreen
          type={GameType.ARTIST}
          mistakes={mistakes}
        >
          <ArtistQuestionScreen
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        </GameScreen>
      );
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return App.getScreen(this.props,
    //   () => {
    //   this.setState((prevState) => {
    //     const nextIndex = prevState.question + 1;
    //     const isEnd = nextIndex >= questions.length;
    //     return {
    //       question: !isEnd ? nextIndex : -1,
    //     };
    //   });
    // }
    );
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  question: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep(question, answer));
  },
});

export default App;
