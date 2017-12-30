import React from "react";
import ReviewItem from "./ReviewItem";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Results extends React.Component {
  render() {
    let { username, title } = this.props;
    if (!username) {
      username = cookies.get("trilobytes-user");
      username && this.props.identifyClient({ username });
    }

    return (
      <div>
        <h1>Your results, {username}</h1>
        <h4>
          <b>Game:</b>
          {title}
        </h4>
        {(this.props._history || []).map(q => {
          let myResponse =
            (q.responses && q.responses.find(r => r.username === username)) ||
            {};

          let {
            prompt,
            choices,
            answer,
            questionKey,
            choiceMarkups,
            links
          } = q;
          return (
            <div key={questionKey} className="results">
              <div>
                <b>The Question:</b> {prompt}
              </div>
              <div>
                <b>Correct Answer:</b> {answer}
              </div>
              <div>
                <b>Your Answer:</b> {myResponse.choice}
              </div>
              <div />
              <div>
                <b>The choices were:</b>
                {choices.map((choice, i) => {
                  return (
                    <ReviewItem
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
              <div>
                {links &&
                  (links.length || "") && [
                    <b>References:</b>,
                    ...links.map(({ text, href }) => (
                      <p key={href}>
                        <a href={href}>
                          {text}: {href}
                        </a>
                      </p>
                    ))
                  ]}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
