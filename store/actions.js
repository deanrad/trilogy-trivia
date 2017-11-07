// mapDispatchToProps
const eventCreators = socket => (/* dispatch */) => ({
  revealAnswer: () => {
    socket.emit('action', {
      type: 'ANSWER_REVEAL',
      payload: {}
    });
  },
  answerQuestion: choice => {
    socket.emit('action', {
      type: 'ANSWER_QUESTION',
      payload: {
        choice
      }
    });
  }
});

export default eventCreators;
