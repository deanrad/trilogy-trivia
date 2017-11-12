import React, { Component } from "react"
import "./Student.css"
import VoteButton from "./VoteButton"
import JoinForm from "./JoinForm"
import randomPraise from "../data/praise"

class Student extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice)
  }

  render() {
    let { round, signIn, answerQuestion, clientId } = this.props
    let { responses, prompt, choices, answer, revealed } = round || {}
    if (!clientId || !round) {
      return <JoinForm signIn={signIn} />
    }

    let myResponse =
      (responses && responses.find(r => r.player === clientId)) || {}
    return (
      <div>
        <div>Question 1</div>
        <h2>{prompt}</h2>
        <br />
        <div className="voting">
          {choices.map(choice => {
            return (
              <VoteButton
                key={choice}
                choice={choice}
                myResponse={myResponse}
                revealed={revealed}
                realAnswer={answer}
                answerQuestion={answerQuestion}
              />
            )
          })}
        </div>
        {revealed && (
          <div>
            The Answer Was:<br />
            <div className="correct-answer">{answer}</div>
          </div>
        )}

        {revealed &&
          answer === myResponse.choice && (
            <div className="praise">{randomPraise()}</div>
          )}
      </div>
    )
  }
}

export default Student
