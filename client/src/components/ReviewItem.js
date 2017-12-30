import React from "react";
import ReactMarkdown from "react-markdown";

const displayStyle = ({
  choice,
  myResponse,
  realAnswer,
  revealed,
  answerQuestion
}) => {
  let myChoice = myResponse && myResponse.choice;

  // they havent answered - no class
  if (!myResponse) return "";

  // not their answer
  if (myChoice !== choice) return "";

  if (!revealed && myChoice === choice) return "pending";
  if (revealed) return myChoice === realAnswer ? "correct" : "incorrect";
};

const ReviewItem = ({
  choice,
  choiceMarkup,
  myResponse,
  realAnswer,
  revealed,
  answerQuestion
}) => {
  let displayClass = displayStyle({ choice, myResponse, realAnswer, revealed });
  return (
    <div className={displayClass} key={choice}>
      {choiceMarkup ? (
        <ReactMarkdown source={choiceMarkup} />
      ) : (
        <li>{choice}</li>
      )}
    </div>
  );
};

export default ReviewItem;
