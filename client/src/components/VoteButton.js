import React from "react";
import ReactMarkdown from "react-markdown";

const displayStyle = ({ choice, myResponse, realAnswer, revealed }) => {
  let myChoice = myResponse && myResponse.choice;

  // they havent answered - no class
  if (!myResponse) return "";

  // not their answer
  if (myChoice !== choice) return "";

  if (!revealed && myChoice === choice) return "pending";
  if (revealed) return myChoice === realAnswer ? "correct" : "incorrect";
};

const VoteButton = ({
  choice,
  choiceMarkup,
  myResponse,
  realAnswer,
  revealed,
  answerQuestion
}) => {
  let displayClass = displayStyle({ choice, myResponse, realAnswer, revealed });
  return (
    <button
      disabled={revealed || !!(myResponse && myResponse.choice)}
      className={displayClass}
      key={choice}
      onClick={e => {
        answerQuestion(choice);
        e.preventDefault();
      }}
    >
      {choiceMarkup ? (
        <ReactMarkdown source={choiceMarkup} />
      ) : (
        <h1>{choice}</h1>
      )}
    </button>
  );
};

export default VoteButton;
