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
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

const transformPlayerToQuestion = (props) => {
  const newProps = Object.assign({}, props, {
    renderQuestion: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};


const GenreQuestionScreenWrapped = withActivePlayer(withTransformProps(transformPlayerToAnswer)(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(withTransformProps(transformPlayerToQuestion)(ArtistQuestionScreen));

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
          <GenreQuestionScreenWrapped
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        </GameScreen>
      );

      case GameType.ARTIST: return (
        <GameScreen
          type={GameType.ARTIST}
        >
          <ArtistQuestionScreenWrapped
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

