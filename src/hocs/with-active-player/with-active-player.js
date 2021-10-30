import React, {PureComponent} from "react";
import AudioPlayer from "../../components/audio-player/audio-player";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return (<Component
        {...this.props}
        renderPlayer={(it, i) => {
          return <AudioPlayer
            onPlayButtonClick={() => {
              this.setState({
                activePlayer: activePlayer === i ? -1 : i,
              });
            }}
            isPlaying={i === activePlayer}
            src={it.src}
          />;
        }}
      />
      );
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
