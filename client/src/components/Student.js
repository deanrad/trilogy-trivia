import React, { Component } from "react";
import "./Student.css";
import VoteButton from "./VoteButton";
import JoinForm from "./JoinForm";
import ReactMarkdown from "react-markdown";

class Student extends Component {
  handleAnswer = choice => {
    this.props.answerQuestion(choice);
  };

  render() {
    let { round, answerQuestion, clientId } = this.props;
    let { questionKey, responses, prompt, choices, answer, revealed } =
      round || {};
    if (!clientId || !round) {
      return <JoinForm {...this.props} />;
    }

    let myResponse =
      (responses && responses.find(r => r.player === clientId)) || {};
    return (
      <div>
        <div>Question {questionKey}</div>
        <h2>{prompt}</h2>
        <ReactMarkdown source={round.markup} />
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
            );
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
            <div className="praise">Way to go!</div>
          )}
      </div>
    );
  }
}

export default Student;
