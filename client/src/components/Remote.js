import React from "react";
import { createSelector } from "reselect";

// unmemoized: works, but creates new object
// let getUserNames = state => Object.keys(state.players).map(p => state.players[p].name)
//
// > getUserNames(props) === getUserNames(props)
// false

// memoized: returns the same object if input hasn't changed
// > getUserNames(props) === getUserNames(props)
// true
let getUserNames = createSelector(
  [state => Object.keys(state.players).map(p => state.players[p].name)],
  names => names
);

export default props => {
  let {
    title,
    round,
    nextRound,
    revealAnswer,
    advanceQuestion,
    showStats
  } = props;
  let { answer } = round || {};
  let nextRoundPrompt = (nextRound || {}).prompt;

  let users = getUserNames(props);

  return (
    <div>
      <div className="row answer-remote" style={{ float: "right" }}>
        Signed on: {users.join(",")} <br />
        Question 1/5 <br />
      </div>
      <div className="row answer-remote" style={{ float: "left" }}>
        Answer: ({answer})<br />
        Next: "{nextRoundPrompt}"
        <br />
      </div>
      <h4 style={{ float: "right" }}>{title}</h4>
      <div style={{ clear: "both" }} />
      <div className="row">
        <div className="col-sm">
          <button className="btn btn-primary" onClick={revealAnswer}>
            Reveal Answer
          </button>
        </div>
        <div className="col-sm">
          <button className="btn btn-primary" onClick={showStats}>
            Show Stats (TODO)
          </button>
        </div>
      </div>
      <div className="row">
        <button
          className="btn btn-primary advance-button"
          onClick={advanceQuestion}
        >
          Next Question
        </button>
      </div>
      <div className="row" style={{ margin: { top: 50 } }}>
        <button className="btn btn-warning">End Game</button>
      </div>
    </div>
  );
};
