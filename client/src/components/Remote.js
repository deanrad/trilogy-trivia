import React from "react"
export default ({ title, round, revealAnswer, advanceQuestion }) => {
  let { answer } = round || {}
  return (
    <div>
      <h1>{title}</h1>
      <div className="row answer-remote">Answer: ({answer})</div>
      <div className="row">
        <div className="col-sm">
          <button className="btn btn-primary" onClick={revealAnswer}>
            Reveal Answer
          </button>
        </div>
        <div className="col-sm">
          <button className="btn btn-primary">Show Stats (TODO)</button>{" "}
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
  )
}
