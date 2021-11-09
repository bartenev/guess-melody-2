import React, {createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operations} from "../../reducer/user/user";

const AuthorizationScreen = (props) => {
  const {onReplayButtonClick, logIn} = props;
  const loginRef = createRef();
  const passwordRef = createRef();

  return (
    <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form
        className="login__form" action=""
        onSubmit={(evt) => {
          evt.preventDefault();
          logIn({
            email: loginRef.current.value,
            password: passwordRef.current.value
          });
        }}>
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="email" name="name" id="name" ref={loginRef} required/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="password" name="password" id="password" ref={passwordRef} required/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
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
  onReplayButtonClick: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logIn(authData) {
    dispatch(Operations.logIn(authData));
  },
});

export {AuthorizationScreen};

export default connect(null, mapDispatchToProps)(AuthorizationScreen);
