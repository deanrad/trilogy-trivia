import React from "react"

const displayStyle = ({
  choice,
  myResponse,
  realAnswer,
  revealed,
  answerQuestion
}) => {
  let myChoice = myResponse && myResponse.choice
  let myChoiceConfirmed = myResponse && myResponse.acceptedAt
  let myChoiceReceived = myResponse && myResponse.receivedAt

  // they havent answered - no class
  if (!myResponse) return ""

  // not their answer
  if (myChoice !== choice) return ""

  if (!revealed && myChoice === choice) return "pending"
  if (revealed) return myChoice === realAnswer ? "correct" : "incorrect"
}

const VoteButton = ({
  choice,
  myResponse,
  realAnswer,
  revealed,
  answerQuestion
}) => {
  return (
    <button
      className={displayStyle({ choice, myResponse, realAnswer, revealed })}
      key={choice}
      onClick={e => {
        answerQuestion(choice)
        e.preventDefault()
      }}
    >
      <h1>{choice}</h1>
    </button>
  )
}

export default VoteButton
