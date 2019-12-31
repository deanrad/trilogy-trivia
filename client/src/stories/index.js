import React from "react";

import { storiesOf } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import VoteButton from "../components/VoteButton";
import { SignIn, RoundView } from "../components/Live";
import Remote from "../components/Remote";
import Student from "../components/Student";
import QuestionChooser from "../components/QuestionChooser";
import "../index.css";

import seedGames from "../data/seed-games.json";
import exampleQuestions from "../data/questions.json";
const exampleGame = seedGames[0];
exampleGame.identifyClient = () => {
  console.log("mock identifyClient");
};
exampleGame.signIn = () => {
  console.log("mock signIn");
};
const exampleRound = exampleGame.round;
console.log(exampleRound);

storiesOf("Live Screen/SignIn", module).add("Noone Joined", () => (
  <SignIn players={{}} />
));

storiesOf("Live Screen/SignIn", module).add("Some People Joined", () => (
  <SignIn players={{ deanius: {} }} />
));

storiesOf("Live Screen/Round View", module)
  .add("Recieving Answers", () => (
    <RoundView players={{ deanius: {}, esdras: {} }} round={exampleRound} />
  ))
  .add("Revealed", () => (
    <RoundView
      players={{ deanius: {}, esdras: {} }}
      round={{ ...exampleRound, revealed: true }}
    />
  ));

storiesOf("Remote Screen", module).add("During Game", () => (
  <Router>
    <Remote {...exampleGame} />
  </Router>
));

storiesOf("Student Screen", module).add("Not signed in", () => (
  <Student {...exampleGame} />
));
storiesOf("Student Screen", module).add("Signed in, waiting", () => (
  <Student {...exampleGame} />
));
storiesOf("Student Screen", module).add("Signed in, game on", () => (
  <Student {...exampleGame} />
));

storiesOf("Question Chooser Screen", module).add("Signed in, game on", () => (
  <QuestionChooser
    game={exampleGame}
    questions={exampleQuestions}
    categories={{}}
  />
));

storiesOf("VoteButton", module)
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
  ));
