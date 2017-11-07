const { createStore } = require('redux');

const initialState = {
  round: null,
  players: []
};

// The heart of Rock & Roll right here, the reducer!
const reducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return Object.assign(state, {
        round: Object.assign(state.round, {
          responses: [...state.round.responses, action.payload]
        })
      });
    case 'STATE_UPDATE':
      return action.payload;
    case 'ANSWER_REVEAL':
      return Object.assign(state, {
        round: Object.assign(state.round, {
          revealed: true
        })
      });
    case 'PLAYER_JOINED':
      return Object.assign(state, {
        players: [...state.players, action.payload]
      });
    case 'PLAYER_LEFT':
      // eslint-disable-next-line no-unused-vars
      let [dropped, ...players] = state.players;
      return Object.assign(state, { players });
    case 'ADVANCE_QUESTION':
      return Object.assign(state, { round: action.payload });
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

if (typeof window !== 'undefined') {
  window.store = store;
}
module.exports = {
  store
};
