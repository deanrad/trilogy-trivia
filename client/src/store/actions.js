// mapDispatchToProps
const eventCreators = socket => store => dispatch => ({
  revealAnswer: () => {
    socket.emit("action", {
      type: "ANSWER_REVEAL",
      payload: {}
    });
  },
  answerQuestion: choice => {
    socket.emit("action", {
      type: "ANSWER_QUESTION",
      payload: {
        choice,
        username: store.getState().username
      }
    });
  },
  advanceQuestion: () => {
    socket.emit("action", {
      type: "ADVANCE_QUESTION"
    });
  },
  signIn: ({ id, name }) => {
    // note - not an 'action'
    socket.emit("join", {
      id,
      name
    });
  },
  identifyClient: ({ username }) => {
    dispatch({
      type: "IDENTIFY_CLIENT",
      payload: { username }
    });
  },
  showStats: () => {
    socket.emit("action", {
      type: "SHOW_STATS"
    });
  },
  chooseQuestions: questions => {
    socket.emit("action", {
      type: "CHOOSE_QUESTIONS",
      payload: {
        questions
      }
    });
  }
});

export default eventCreators;
