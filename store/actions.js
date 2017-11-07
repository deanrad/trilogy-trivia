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
  },
  startGame: () => {
    socket.emit('action', {
      type: 'ADVANCE_QUESTION',
      payload: {
        question: 'Whatcha doin?',
        choices: [
          'Uh, nuthin',
          'Chillaxin',
          'Worrying about climate change',
          'Courting sweet oblivion :)'
        ],
        answer: null,
        revealed: false,
        responses: []
      }
    });
  }
});

export default eventCreators;
