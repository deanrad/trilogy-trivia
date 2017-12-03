import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import VoteButton from "../components/VoteButton";
import "../index.css";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

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
  ));
