import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import Mistakes from "../mistakes/mistakes";
import {connect} from "react-redux";

const GameScreen = (props) => {
  const {type, children, mistakes} = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <Mistakes
          count={mistakes}
        />

      </header>
      {children}
    </section>
  );
};

GameScreen.propTypes = {
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: state.mistakes,
});

export {GameScreen};

export default connect(mapStateToProps)(GameScreen);
