import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";

const GenreQuestionScreen = (props) => {
  const {onAnswer, question, renderAnswer, userAnswers, changeAnswers} = props;
  const {answers, genre} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(question, answers);
        }}
      >
        {answers.map((answer, i) => (
          <div key={`${i}-${answer.src}`} className="track">
            {renderAnswer(answer, i)}
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                checked={userAnswers[i]}
                onChange={(evt) => {
                  const value = evt.target.checked;
                  changeAnswers(i, value);
                }}/>
              <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
            </div>
          </div>
        ))
        }
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  renderAnswer: PropTypes.func.isRequired,
  changeAnswers: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GenreQuestionScreen;
