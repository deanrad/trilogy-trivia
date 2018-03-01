const { createStore } = require("redux");

const initialState = require("../data/gameState");

// The heart of Rock & Roll right here, the reducer!
const reducer = (state, action) => {
  switch (action.type) {
    case "STATE_UPDATE":
      // overwrite top-level fields, but leave any extras
      return Object.assign({}, state, action.payload);
    case "ANSWER_QUESTION":
      return Object.assign({}, state, {
        round: Object.assign(state.round, {
          responses: [
            ...state.round.responses,
            Object.assign(action.payload, { receivedAt: new Date() })
          ]
        })
      });
    case "ANSWER_REVEAL":
      return Object.assign({}, state, {
        round: Object.assign(state.round, {
          revealed: true
        })
      });
    case "SHOW_STATS":
      return Object.assign({}, state, {
        round: Object.assign(state.round, {
          showStats: true
        })
      });
    case "CONNECTION_ADDED":
      return Object.assign({}, state, {
        currentConnectionCount: state.currentConnectionCount + 1,
        maxConnectionCount: state.maxConnectionCount + 1
      });
    case "CONNECTION_LEFT":
      return Object.assign({}, state, {
        currentConnectionCount: state.currentConnectionCount - 1
      });
    case "PLAYER_JOINED":
      return Object.assign({}, state, {
        players: Object.assign(state.players, {
          [action.payload.id]: {
            name: action.payload.name,
            points: 0
          }
        })
      });
    case "IDENTIFY_CLIENT":
      // merge any provided fields into state
      return Object.assign({}, state, action.payload);
    case "PLAYER_LEFT":
      // eslint-disable-next-line no-unused-vars
      let players = Object.assign({}, state.players);
      delete players[action.payload.id];
      return Object.assign({}, state, { players });
    case "ADVANCE_QUESTION":
      const { question, nextPrompt } = action.payload;
      const qWithResponses = state.round;
      return Object.assign({}, state, {
        round: Object.assign({}, question, { responses: [] }),
        nextRound: { prompt: nextPrompt },
        curQuestionIdx: state.curQuestionIdx + 1,
        history: qWithResponses
          ? [...(state.history || []), qWithResponses]
          : []
      });
    case "CHOOSE_QUESTIONS":
      const { questions } = action.payload;
      return Object.assign(state, {
        questions,
        nextRound: { prompt: questions[0].prompt },
        curQuestionIdx: 0
      });
    default:
      return state;
  }
};

const devTools =
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = devTools
  ? createStore(reducer, initialState, devTools)
  : createStore(reducer, initialState);

if (typeof window !== "undefined") {
  window.store = store;
}
module.exports = {
  store
};
