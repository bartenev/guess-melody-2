import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   answers: [false, false, false, false],
    // };
  }

  render() {
    const {onAnswer, question, renderAnswer, userAnswers, changeAnswers} = this.props;
    const {answers, genre} = question;
    // const {answers: userAnswers} = this.state;

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
                    // this.setState({
                    //   answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                    // });
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
  }
}

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
  userAnswers: PropTypes.arrayOf(PropTypes.bool),
};

export default GenreQuestionScreen;
