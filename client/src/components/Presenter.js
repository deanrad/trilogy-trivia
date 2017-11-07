import React from 'react';

class InputForm extends React.Component {
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

const SignIn = ({ players }) => (
  <div>
    <h1>Join the Trivia Game!</h1>
    <h1>{players.length} Players Joined</h1>
    <InputForm />
  </div>
);

const RoundView = ({ round }) => (
  <div>
    <h1>{round.responses.length} Responses Received</h1>
  </div>
);

export default ({ players, round }) => (
  <div>
    {/* TODO show SignIn before a round's begun,
            RoundView when the round's in progress
     */}
    <SignIn players={players} />
    <RoundView round={round} />
  </div>
);
