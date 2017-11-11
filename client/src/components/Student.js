import React, { Component } from "react"
import "./Student.css"
import VoteButton from "./VoteButton"

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

class Student extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice)
  }

  render() {
    let { round, signIn, answerQuestion } = this.props
    let { responses, prompt, choices, answer, revealed } = round || {}
    if (!round) {
      return <JoinForm signIn={signIn} />
    }

    let myResponse = responses[0] || {}
    return (
      <div>
        <div>Question 1</div>
        <h2>{prompt}</h2>
        <br />
        <div className="voting">
          {choices.map(choice =>
            VoteButton({ choice, responses, revealed, answerQuestion })
          )}
        </div>

        {revealed &&
          (answer !== myResponse.choice ? (
            <div className="answer">
              The Answer Was:<br /> {answer}
            </div>
          ) : (
            <div className="answer">
              Wow. You're both smart, AND good-looking!
            </div>
          ))}
      </div>
    )
  }
}

export default Student
