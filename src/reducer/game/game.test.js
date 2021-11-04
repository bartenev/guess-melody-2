import {
  ActionCreator, ActionType,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer
} from "./game";

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          picture: `incorrect-pic`,
          artist: `incorrect-artist`,
        },
        {
          picture: `correct-pic`,
          artist: `correct-artist`,
        },
        {
          picture: `incorrect-pic`,
          artist: `incorrect-artist`,
        },
      ],
    }, {
      artist: `correct-artist`,
      picture: `correct-pic`,
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          picture: `incorrect-pic`,
          artist: `incorrect-artist`,
        },
        {
          picture: `correct-pic`,
          artist: `correct-artist`,
        },
        {
          picture: `incorrect-pic`,
          artist: `incorrect-artist`,
        },
      ],
    }, {
      picture: `incorrect-pic`,
      artist: `incorrect-artist`,
    })).toBe(false);
  });

  it(`Genre answer is checked correctly`, () => {
    expect(isGenreAnswerCorrect({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `0`,
          genre: `jazz`,
        },
        {
          src: `1`,
          genre: `blues`,
        },
        {
          src: `2`,
          genre: `rock`,
        },
        {
          src: `3`,
          genre: `jazz`,
        }
      ],
    }, [false, false, true, false])).toEqual(true);

    expect(isGenreAnswerCorrect({
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `0`,
          genre: `jazz`,
        },
        {
          src: `1`,
          genre: `blues`,
        },
        {
          src: `2`,
          genre: `rock`,
        },
        {
          src: `3`,
          genre: `jazz`,
        }
      ],
    }, [false, false, false, false])).toEqual(false);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.decrementTimer()).toEqual({
      type: ActionType.DECREMENT_TIMER,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        },
        {
          artist: `incorrect`,
          picture: ``,
        },
        {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        },
        {
          genre: `jazz`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
        {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `INCREMENT_STEP`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: 0,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 1,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });
  });

  it(`Reducer should decrement timer by a given value`, () => {
    expect(reducer({
      step: 1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `DECREMENT_TIMER`,
      payload: 1,
    })).toEqual({
      step: 1,
      mistakes: 0,
      timer: 299,
      maxMistakes: 3,
      maxTimer: 300,
    });

    expect(reducer({
      step: 1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    }, {
      type: `DECREMENT_TIMER`,
      payload: 0,
    })).toEqual({
      step: 1,
      mistakes: 0,
      timer: 300,
      maxMistakes: 3,
      maxTimer: 300,
    });
  });
});
