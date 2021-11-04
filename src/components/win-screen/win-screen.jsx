import React from "react";
import PropTypes from "prop-types";

const WinScreen = (props) => {
  const {time, mistakes, points, onReplayButtonClick} = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">За {Math.floor(time / 60)} минуты и {time % 60} секунд вы набрали {points} баллов (N быстрых), совершив {mistakes} ошибки</p>
      <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
      <button
        className="replay"
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          onReplayButtonClick();
        }}
      >Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  time: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default WinScreen;
