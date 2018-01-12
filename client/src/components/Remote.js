import React from "react";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

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
    questions,
    curQuestionIdx,
    nextRound,
    revealAnswer,
    advanceQuestion,
    showStats
  } = props;
  let { answer, prompt } = round || {};
  let nextRoundPrompt = (nextRound || {}).prompt;

  let users = getUserNames(props);

  return (
    <div>
      <h4 style={{ float: "right" }}>
        <a target="_blank" href="/student">
          {title}
        </a>
      </h4>
      <div className="row answer-remote" style={{ float: "right" }}>
        Signed on: {users.join(",")} <br />
        Question {curQuestionIdx}/ {questions && questions.length} <br />
      </div>
      <div className="row answer-remote" style={{ float: "left" }}>
        Current: {prompt}
        <br />
        <span style={{ color: "gray" }}>Answer: {answer}</span>
      </div>
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
          Next Question<br />
          <i>{nextRoundPrompt}</i>
        </button>
      </div>
      <div className="row">
        <Link to="/questions">
          <button className="btn btn-primary">Choose Questions</button>
        </Link>
      </div>
      <div className="row" style={{ margin: { top: 50 } }}>
        <Link to="/results">
          <button className="btn btn-warning">End Game</button>
        </Link>
      </div>
    </div>
  );
};
