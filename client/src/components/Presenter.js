import React from "react"

const SignIn = ({ title, players }) => (
  <div>
    <h2 className="game-title">{title}</h2>
    <h1>Join Us at <span className="join-link">{document.location.href.replace(/\/\w+$/, "")}</span> !</h1>
    <h3>{Object.keys(players).length} Players Joined</h3>
    <div className="App">
      <div className="App-header">
        <img src="/img/trilobyte.jpg" className="App-logo" alt="logo" />
        <h2>Welcome to Trilobytes!</h2>
      </div>
    </div>
    {/* TODO we can know how many lurkers too */}
  </div>
)

const RoundView = ({ players, round }) => (
  <div>
    <div class="response-count">
      {round.responses.length}/{Object.keys(players).length} Responses Received
    </div>
    <h1>{round.prompt}</h1>
    {round.choices.map(choice => (
      <div
        key={choice}
        className={
          choice === round.answer && round.revealed ? "correct-answer" : ""
        }
      >
        <button>{choice}</button>
      </div>
    ))}
    {round.revealed &&
      [<h3>Links</h3>].concat(
        round.links.map(({ text, href }) => (
          <p>
            <a href={href}>{text}</a>
          </p>
        ))
      )}
  </div>
)

export default props => (
  <div>
    {/* TODO show SignIn before a round's begun,
            RoundView when the round's in progress
     */}
    {props.round ? <RoundView {...props} /> : <SignIn {...props} />}
  </div>
)
