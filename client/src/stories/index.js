import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Button, Welcome } from "@storybook/react/demo"
import VoteButton from "../components/VoteButton"
import Live, { SignIn, RoundView } from "../components/Live"
import Remote from "../components/Remote"
import Student from "../components/Student"
import QuestionChooser from "../components/QuestionChooser"
import "../index.css"

import seedGames from "../data/seed-games.json"
const exampleGame = seedGames[0]
exampleGame.identifyClient = () => {
  console.log("mock identifyClient")
}
exampleGame.signIn = () => {
  console.log("mock signIn")
}
const exampleRound = exampleGame.round
console.log(exampleRound)

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
))

storiesOf("Live Screen/SignIn").add("Noone Joined", () => (
  <SignIn players={{}} />
))

storiesOf("Live Screen/SignIn").add("Some People Joined", () => (
  <SignIn players={{ deanius: {} }} />
))

storiesOf("Live Screen/Round View")
  .add("Recieving Answers", () => (
    <RoundView players={{ deanius: {}, esdras: {} }} round={exampleRound} />
  ))
  .add("Revealed", () => (
    <RoundView
      players={{ deanius: {}, esdras: {} }}
      round={{ ...exampleRound, revealed: true }}
    />
  ))

storiesOf("Remote Screen").add("During Game", () => <Remote {...exampleGame} />)

storiesOf("Student Screen").add("Not signed in", () => (
  <Student {...exampleGame} />
))
storiesOf("Student Screen").add("Signed in, waiting", () => (
  <Student {...exampleGame} />
))
storiesOf("Student Screen").add("Signed in, game on", () => (
  <Student {...exampleGame} />
))

storiesOf("Question Chooser Screen").add("Signed in, game on", () => (
  <QuestionChooser {...exampleGame} />
))

storiesOf("VoteButton", module)
  .add("ViewOnly", () => <VoteButton choice="Not clickable" viewOnly={true} />)
  .add("Initial", () => <VoteButton choice="/api/tables/1" />)
  .add("Answered/Chosen", () => (
    <VoteButton
      choice="/api/tables/1"
      myResponse={{ choice: "/api/tables/1" }}
    />
  ))
  .add("Answered/Other", () => (
    <VoteButton
      choice="/api/tables/2"
      myResponse={{ choice: "/api/tables/1" }}
    />
  ))
  .add("Revealed/Chosen, Correct", () => (
    <VoteButton
      choice="/api/tables/2"
      myResponse={{ choice: "/api/tables/2" }}
      realAnswer="/api/tables/2"
      revealed={true}
    />
  ))
  .add("Revealed/Chosen, Wrong", () => (
    <VoteButton
      choice="/api/tables/2"
      myResponse={{ choice: "/api/tables/2" }}
      realAnswer="/api/tables/1"
      revealed={true}
    />
  ))
  .add("Revealed/Other", () => (
    <VoteButton
      choice="/api/tables/2"
      myResponse={{ choice: "/api/tables/1" }}
      realAnswer="/api/tables/1"
      revealed={true}
    />
  ))
