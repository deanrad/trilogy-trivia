import React from "react";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

export default class Results extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>TODO results</h1>
        {(this.props._history || []).map(q => <h3>{q.prompt}</h3>)}
      </div>
    );
  }
}
