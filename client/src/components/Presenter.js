import React from 'react';

const SignIn = ({ players }) => (
  <div>
    <h1>Join the Trivia Game!</h1>
    <div className="App">
      <div className="App-header">
        <img src="/img/trilobyte.jpg" className="App-logo" alt="logo" />
        <h2>Welcome to Trilobytes!</h2>
      </div>
    </div>
    <h1>{players.length} Players Joined</h1>
  </div>
);

const RoundView = ({ round }) => (
  <div>
    <h1>{round.responses.length} Responses Received</h1>
    <h1>{round.question}</h1>
    {round.choices.map(choice => (
      <div key={choice}>
        <button>{choice}</button>
      </div>
    ))}
  </div>
);

export default props => (
  <div>
    {/* TODO show SignIn before a round's begun,
            RoundView when the round's in progress
     */}
    {props.round ? <RoundView {...props} /> : <SignIn {...props} />}
  </div>
);
