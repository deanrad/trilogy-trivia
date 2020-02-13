import React from "react";
import axios from "axios";
import Select from "react-select";
import "react-select/dist/react-select.css";
import intersect from "lodash.intersection";

const allQuestionStyles = {
  border: "1px solid black",
  maxHeight: "100%",
  overflow: "scroll"
};

export const DataQuestionChooser = class DataQuestionChooser extends React.Component {
  state = {
    questions: [],
    categories: {}
  };
  componentDidMount() {
    const categories = { Uncategorized: 0 };
    axios.get("/questions.json").then(({ data: questions }) => {
      questions.forEach(q => {
        if (q.categories.length === 0) {
          categories.Uncategorized += 1;
        }
        (q.categories || []).forEach(cat => {
          categories[cat] = (categories[cat] || 0) + 1;
        });
      });
      this.setState({ questions, categories });
    });
  }
  render() {
    return <QuestionChooser {...this.props} {...this.state} />;
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

    const catValues = selectedCats.map(opt => opt.value);
    const questions = this.props.questions.filter(
      q =>
        intersect(catValues, q.categories).length > 0 ||
        (q.categories.length === 0 && catValues.includes("Uncategorized"))
    );

    this.setState({ selected: questions });
  };

  handleStartGame = () => {
    this.props.chooseQuestions(this.state.selected);
    this.props.history.push("/remote");
  };

  handleUpload = e => {
    var fileread = new FileReader();
    fileread.onload = e => {
      const uploaded = JSON.parse(e.target.result);
      this.setState({ selected: uploaded });
    };
    fileread.readAsText(e.target.files[0]);
  };

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  render() {
    let { questions = [] } = this.props;
    let categories = this.props.categories;
    let options = Object.keys(categories)
      .sort()
      .map(cat => {
        return {
          label: `${cat} (${categories[cat]})`,
          value: cat
        };
      });
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-6" style={{ marginBottom: 10 }}>
            <Select
              multi={true}
              options={options}
              value={this.state.selectedCats}
              onChange={this.handleCatSelect}
            />
          </div>
          <div className="col-sm-12 col-md-3">
            <button
              className="btn btn-primary"
              id="question-start"
              onClick={this.handleStartGame}
            >
              Save Questions
            </button>
          </div>
          <div className="col-sm-12 col-md-3">
            <input type="file" onChange={this.handleUpload}></input>
            Upload
          </div>
        </div>
        <div className="row">
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
      </div>
    );
  }
}
