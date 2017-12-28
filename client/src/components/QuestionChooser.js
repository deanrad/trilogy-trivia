import React from "react";
import axios from "axios";
import Select from "react-select";
import "react-select/dist/react-select.css";

const allQuestionStyles = {
  border: "1px solid black",
  maxHeight: "100%",
  overflow: "scroll"
};

export const DataQuestionChooser = class DataQuestionChooser extends React.Component {
  state = {
    questions: [],
    categories: new Set()
  };
  componentDidMount() {
    const categories = new Set();
    axios.get("/questions.json").then(({ data: questions }) => {
      questions.forEach(q => {
        (q.categories || []).forEach(cat => categories.add(cat));
      });
      this.setState({ questions, categories });
    });
  }
  render() {
    return <QuestionChooser {...this.state} />;
  }
};

export default class QuestionChooser extends React.Component {
  state = {
    selected: [],
    selectedCats: null
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

  handleCatSelect = selectedCats => {
    this.setState({ selectedCats });
  };

  render() {
    let { questions = [] } = this.props;
    let options = Array.from(this.props.categories).map(cat => ({
      label: cat,
      value: cat
    }));
    return (
      <div>
        <Select
          multi={true}
          options={options}
          value={this.state.selectedCats}
          onChange={this.handleCatSelect}
        />
        <div style={allQuestionStyles}>
          {questions.map(q => {
            const isSelected = this.state.selected.includes(q);
            return (
              <div
                key={q.questionKey}
                onClick={() => {
                  this.toggleSelection(q);
                }}
                className={isSelected ? "selected" : ""}
              >
                <dt>{q.questionKey}</dt>
                <dd>{q.prompt}</dd>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
