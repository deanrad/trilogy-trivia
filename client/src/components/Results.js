import React from "react";
import VoteButton from "./VoteButton";

export default class Results extends React.Component {
  render() {
    let { username } = this.props;

    return (
      <div>
        <h1>TODO results</h1>
        {(this.props._history || []).map(q => {
          let myResponse =
            (q.responses && q.responses.find(r => r.username === username)) ||
            {};

          let { prompt, choices, answer, questionKey, choiceMarkups } = q;
          return (
            <div key={questionKey}>
              <div>{prompt}</div>
              {choices.map((choice, i) => {
                return (
                  <VoteButton
                    key={choice}
                    choice={choice}
                    choiceMarkup={choiceMarkups[i]}
                    myResponse={myResponse}
                    revealed={true}
                    realAnswer={answer}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
