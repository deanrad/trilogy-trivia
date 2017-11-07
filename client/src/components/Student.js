import React, { Component } from 'react';
import './Student.css';

class JoinForm extends React.Component {
  state = {
    value: ''
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    console.log('TODO submit the username');
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
          />
        </label>
        <input type="submit" value="Join" />
      </form>
    );
  }
}

class App extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice);
  };

  render() {
    if (!this.props.round) {
      return <JoinForm />;
    }
    return (
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
    );
  }
}

export default App;
