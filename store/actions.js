// const store = require('./index').store;
const questions = require('../data/questions.json');

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
    // TODO and the questions after the first
    socket.emit('action', {
      type: 'ADVANCE_QUESTION',
      payload: Object.assign(questions[0], { responses: [] })
    });
  }
});

export default eventCreators;
