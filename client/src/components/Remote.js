import React from 'react';
export default ({ revealAnswer, advanceQuestion }) => (
  <div>
    <h1>This will be the remote control display</h1>
    <button onClick={revealAnswer}>Reveal Answer</button>
    <button onClick={advanceQuestion}>Next Question</button>
  </div>
);
