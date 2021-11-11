import React from "react";
import {AppRoute, GameOverType} from "../../const";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const gameOverOptions = [
  {
    type: GameOverType.MAX_MISTAKES,
    title: `Какая жалость!`,
    description: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  },
  {
    type: GameOverType.MAX_TIME,
    title: `Увы и ах!`,
    description: `Время вышло! Вы не успели отгадать все мелодии`,
  },
];

const GameOverScreen = (props) => {
  const {type, onReplayButtonClick} = props;
  const data = gameOverOptions.find((it) => it.type === type);
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">{data.title}</h2>
      <p className="result__total result__total--fail">{data.description}</p>
      <Link
        className="replay"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >Попробовать ещё раз</Link>
    </section>
  );
};

GameOverScreen.propTypes = {
  type: PropTypes.oneOf([GameOverType.MAX_MISTAKES, GameOverType.MAX_TIME]).isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default GameOverScreen;
