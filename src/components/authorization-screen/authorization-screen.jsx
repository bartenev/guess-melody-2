import React from "react";
import PropTypes from "prop-types";

const AuthorizationScreen = (props) => {
  const {time, mistakes, points, onReplayButtonClick} = props;

  return (
    <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За {Math.floor(time / 60)} минуты и {time % 60} секунд вы набрали {points} баллов (N быстрых), совершив {mistakes} ошибки</p>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name"/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password"/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button
          className="login__button button"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
          }}
        >Войти</button>
      </form>
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

AuthorizationScreen.propTypes = {
  time: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default AuthorizationScreen;
