import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/game/game";
import {getTimer} from "../../reducer/game/selectors";

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

class Timer extends PureComponent {
  constructor(props) {
    super(props);

    this._timerId = null;
  }

  componentDidMount() {
    this._timerId = this._tick();
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
    this._timerId = null;
  }

  render() {
    const {timer} = this.props;

    const minutes = formatTime(Math.floor(timer / 60));
    const seconds = formatTime(timer % 60);

    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{minutes}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{seconds}</span>
      </div>
    );
  }

  _tick() {
    return setInterval(() => {
      this.props.onTimerTick();
    }, 1000);
  }
}

const mapStateToProps = (state) => ({
  timer: getTimer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTimerTick: () => {
    dispatch(ActionCreator.decrementTimer());
  },
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  onTimerTick: PropTypes.func.isRequired,
};

export {Timer};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
