import React from "react";

export default class Results extends React.Component {
  render() {
    return (
      <div>
        <h1>TODO results</h1>
        {(this.props._history || []).map(q => (
          <h3 key={q.questionKey}>{q.prompt}</h3>
        ))}
      </div>
    );
  }
}
