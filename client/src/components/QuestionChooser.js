import React from "react";
import axios from "axios";

const styles = {
  border: "1px solid black"
};

export const DataQuestionChooser = class DataQuestionChooser extends React.Component {
  state = {
    questions: []
  };
  componentDidMount() {
    axios
      .get("/questions.json")
      .then(({ data: questions }) => this.setState({ questions }));
  }
  render() {
    return <QuestionChooser questions={this.state.questions} />;
  }
};

export default class QuestionChooser extends React.Component {
  state = {
    selected: []
  };

  toggleSelection(q) {
    let { selected } = this.state;

    let newSelected =
      selected.indexOf(q) > -1
        ? selected.filter(s => s !== q)
        : (selected.push(q) && selected);

    this.setState({
      selected: newSelected
    });
  }

  render() {
    let { questions = [] } = this.props;

    return (
      <div style={styles}>
        {questions.map(q => {
          return (
            <div
              key={q.questionKey}
              onClick={() => {
                this.toggleSelection(q);
              }}
            >
              <dt>{q.questionKey}</dt>
              <dd>{q.prompt}</dd>
            </div>
          );
        })}
      </div>
    );
  }
}
