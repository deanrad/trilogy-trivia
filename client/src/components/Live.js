import React from "react";
import ReactMarkdown from "react-markdown";

export const SignIn = ({ title, players }) => {
  let url = document.location.href.replace(/\/\w+$/, "");
  let link = <a href={url}>{url}</a>;

  return (
    <div>
      <h3 style={{ float: "right" }}>
        {Object.keys(players).length} Players Joined
      </h3>
      <div style={{ clear: "both", padding: 47, margin: 20 }} className="App">
        <div className="App-header">
          {
            <img
              src="/img/trilobyte.jpg"
              className="App-logo"
              alt="logo"
              style={{ float: "right" }}
            />
          }
          <h2>Introducing, Trilobytes of Trivia!</h2>
          <h1>
            Join Us at <span className="join-link">{link}</span> !
          </h1>
        </div>
      </div>
      {/* TODO we can know how many lurkers too */}
    </div>
  );
};

export const RoundView = ({ players, round }) => (
  <div>
    <div className="response-count">
      Question {round.questionKey}
      <br />
      {Math.min(Object.keys(players).length, (round.responses || []).length)}/{
        Object.keys(players).length
      }{" "}
      Responses Received
    </div>
    <div style={{ clear: "both", padding: 25 }}>
      <h1 style={{ fontSize: "larger" }}>{round.prompt}</h1>
      <h2>
        <ReactMarkdown source={round.markup} />
      </h2>
      {(round.choices || [])
        .filter(c => !round.revealed || c === round.answer)
        .map((choice, idx) => (
          <div
            key={choice}
            className={
              choice === round.answer && round.revealed ? "correct-answer" : ""
            }
          >
            <div className="live-answer">
              <span className="live-label">
                {String.fromCharCode(65 + idx)}
              </span>
              {choice}
            </div>
          </div>
        ))}
      {round.revealed && (
        <div>
          <h3>Links</h3>
          {round.links &&
            round.links.length &&
            round.links.map(({ text, href }) => (
              <p key={href}>
                <a href={href}>{text}</a>
              </p>
            ))}
        </div>
      )}
    </div>
  </div>
);
const StatsView = props => {
  return <div>TODO STATS</div>;
};

export default props => {
  let { title } = props;
  return (
    <div>
      <h2 className="game-title">{title}</h2>
      {/* TODO show SignIn before a round's begun,
            RoundView when the round's in progress
     */}
      {props.round ? (
        props.round.showStats ? (
          <StatsView />
        ) : (
          <RoundView {...props} />
        )
      ) : (
        <SignIn {...props} />
      )}
    </div>
  );
};
