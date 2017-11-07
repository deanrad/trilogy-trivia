const { createStore } = require('redux');

const initialState = {
  round: {
    question: 'Whatcha doin?',
    choices: [
      'Uh, nuthin',
      'Chillaxin',
      'Worrying about climate change',
      'Courting sweet oblivion :)'
    ],
    answer: null,
    responses: []
  }
};
// a function of state and action, which always returns state
const reducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        round: {
          ...state.round,
          responses: [...state.round.responses, action.payload]
        }
      };
    case 'STATE_UPDATE':
      return action.payload
    default:
      return state;
  }
};

const devTools =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = devTools
  ? createStore(reducer, initialState, devTools)
  : createStore(reducer, initialState);

module.exports = {
  store
};
