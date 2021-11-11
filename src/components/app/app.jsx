import React from "react";
import PropTypes from "prop-types";
import {AppRoute, GameOverType, GameType} from "../../const";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import {MAX_MISTAKES_COUNT} from "../../const";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import withAnswers from "../../hocs/with-answers/with-answers";
import {getMaxMistakes, getMaxTimer, getMistakes, getStep, getTimer} from "../../reducer/game/selectors";
import {getQuestions} from "../../reducer/data/selectors";
import GameOverScreen from "../game-over-screen/game-over-screen";
import WinScreen from "../win-screen/win-screen";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import {Switch, Route, Redirect} from "react-router-dom";
import PrivateRoute from "../private-route/private-route";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";

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

const GenreQuestionScreenWrapped = withActivePlayer(
    withAnswers(
        withTransformProps(transformPlayerToAnswer)(GenreQuestionScreen)
    )
);
const ArtistQuestionScreenWrapped = withActivePlayer(
    withTransformProps(transformPlayerToQuestion)(ArtistQuestionScreen)
);

const getScreen = (props) => {
  const {
    gameTime,
    questions,
    step, mistakes,
    maxMistakes,
    timer,
    onUserAnswer,
    onWelcomeScreenClick,
    authorizationStatus
  } = props;

  if (step === -1) {
    return (
      <WelcomeScreen
        time={gameTime}
        errorCount={MAX_MISTAKES_COUNT}
        onWelcomeScreenClick={onWelcomeScreenClick}
      />
    );
  }

  if (mistakes >= maxMistakes || timer <= 0) {
    // return history.push(AppRoute.LOSE);
    return (
      <Redirect to={AppRoute.LOSE} />
    );
  }

  if (step >= questions.length) {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      // return history.push(AppRoute.RESULT);
      return (
        <Redirect to={AppRoute.RESULT} />
      );
    } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      // return history.push(AppRoute.LOGIN);
      return (
        <Redirect to={AppRoute.LOGIN} />
      );
    }

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
};

const App = (props) => {
  const {
    questions,
    mistakes,
    maxMistakes,
    timer,
    maxTimer,
    resetGame,
    authorizationStatus
  } = props;

  const screen = getScreen(props);
  const gameOverType = mistakes >= maxMistakes ? GameOverType.MAX_MISTAKES : GameOverType.MAX_TIME;

  return (
    <Switch>
      <Route path={AppRoute.ROOT} exact render={() => screen} />
      <Route path={AppRoute.LOSE} exact render={() => (
        <GameOverScreen
          type={gameOverType}
          onReplayButtonClick={resetGame}
        />
      )}
      />
      <Route path={AppRoute.LOGIN} exact render={() => (
        <AuthorizationScreen
          onReplayButtonClick={resetGame}
        />
      )}
      />
      <PrivateRoute
        path={AppRoute.RESULT}
        exact
        authorizationStatus={authorizationStatus}
        render={() => (
          <WinScreen
            time={maxTimer - timer}
            mistakes={mistakes}
            points={questions.length - mistakes}
            onReplayButtonClick={resetGame}
          />
        )}
      />
    </Switch>
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  maxTimer: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
  timer: getTimer(state),
  maxTimer: getMaxTimer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
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
