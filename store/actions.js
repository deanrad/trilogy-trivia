// mapDispatchToProps
const eventCreators = socket => (/* dispatch */) => ({
  revealAnswer: () => {
    socket.emit('action', {
      type: 'ANSWER_REVEAL',
      payload: {}
    });
  }
});

export default eventCreators;
