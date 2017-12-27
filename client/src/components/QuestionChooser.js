import React from "react";
import axios from "axios";

const allQuestionStyles = {
  border: "1px solid black",
  maxHeight: "100%",
  overflow: "scroll"
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

    let newSelected = selected.includes(q)
      ? selected.filter(s => s !== q)
      : selected.push(q) && selected;

    this.setState({
      selected: newSelected
    });
  }

  render() {
    let { questions = [] } = this.props;

    return (
      <div style={allQuestionStyles}>
        {questions.map(q => {
          const isSelected = this.state.selected.includes(q)
          return (
            <div
              key={q.questionKey}
              onClick={() => {
                this.toggleSelection(q);
              }}
              className={isSelected ? 'selected' : ''}
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
