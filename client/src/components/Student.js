import React, { Component } from "react"
import "./Student.css"

class JoinForm extends React.Component {
  state = {
    name: "",
    joined: false
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = event => {
    this.props.signIn({
      name: this.state.name
    })
    this.setState({ joined: true })
    event.preventDefault()
  }

  render() {
    return this.state.joined ? (
      <div>Thank you! The game will begin shortly</div>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            disabled={this.state.joined}
          />
        </label>
        <input type="submit" value="Join" disabled={this.state.joined} />
      </form>
    )
  }
}

class App extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice)
  }

  render() {
    if (!this.props.round) {
      return <JoinForm signIn={this.props.signIn} />
    }

    return (
      <div className="App-intro">
        <h1>{this.props.round.prompt}</h1>
        {this.props.round.choices.map(choice => (
          <div key={choice}>
            <button
              onClick={() => {
                this.handleAnswer(choice)
              }}
            >
              {choice}
            </button>
          </div>
        ))}
      </div>
    )
  }
}

export default App
