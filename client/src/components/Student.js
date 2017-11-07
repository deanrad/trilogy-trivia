import React, { Component } from 'react';
import './Student.css';

class App extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice)
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="/img/trilobyte.jpg" className="App-logo" alt="logo" />
          <h2>Welcome to Trilobytes!</h2>
        </div>
        <div className="App-intro">
          <h1>{this.props.round.question}</h1>
          {this.props.round.choices.map(choice => (
            <div key={choice}>
              <button
                onClick={() => {
                  this.handleAnswer(choice);
                }}
              >
                {choice}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
