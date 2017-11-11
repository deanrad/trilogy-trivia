import React from "react"

const displayStyle = ({ choice, myID, responses, judged }) => {
  let myResponse = responses[0]
  let myChoice = myResponse && myResponse.choice
  let myChoiceConfirmed = myResponse && myResponse.acceptedAt
  let myChoiceReceived = myResponse && myResponse.receivedAt

  // they havent answered
  if (!myResponse) return ""
  // this button isnt for their answer
  if (myChoice !== choice) return ""

  if (!myChoiceReceived) return "pending"
  if (!judged) return "pending"

  return myChoiceConfirmed ? "accepted" : "incorrect"
}

export default ({ choice, responses, judged, myID, answerQuestion }) => (
  <button
    disabled={judged}
    className={displayStyle({ choice, responses, judged, myID })}
    key={choice}
    onClick={() => answerQuestion(choice)}
  >
    <h1>{choice}</h1>
  </button>
)
