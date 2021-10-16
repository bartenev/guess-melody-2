import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import {MAX_MISTAKES_COUNT} from "../../const";

class App extends PureComponent {
  static getScreen(props) {
    const {gameTime, questions, step, onUserAnswer, onWelcomeScreenClick} = props;

    if (step === -1) {
      return (
        <WelcomeScreen
          time={gameTime}
          errorCount={MAX_MISTAKES_COUNT}
          onWelcomeScreenClick={onWelcomeScreenClick}
        />
      );
    }

    const currentQuestion = questions[step];

    switch (currentQuestion.type) {
      case GameType.GENRE: return (
        <GameScreen
          type={GameType.GENRE}
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
    return App.getScreen(this.props);
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  // resetGame() {
  //   dispatch(ActionCreator.resetGame());
  // },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.decrementTimer());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);

