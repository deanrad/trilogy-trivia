const { createStore } = require("redux")

const initialState = require("../data/gameState")

// The heart of Rock & Roll right here, the reducer!
const reducer = (state, action) => {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return Object.assign(state, {
        round: Object.assign(state.round, {
          responses: [...state.round.responses, action.payload]
        })
      })
    case "STATE_UPDATE":
      return action.payload
    case "ANSWER_REVEAL":
      return Object.assign(state, {
        round: Object.assign(state.round, {
          revealed: true
        })
      })
    case "CONNECTION_ADDED":
      return Object.assign(state, {
        currentConnectionCount: state.currentConnectionCount + 1,
        maxConnectionCount: state.maxConnectionCount + 1
      })
    case "CONNECTION_LEFT":
      return Object.assign(state, {
        currentConnectionCount: state.currentConnectionCount - 1
      })
    case "PLAYER_JOINED":
      return Object.assign(state, {
        players: Object.assign(state.players, {
          [action.payload.id]: action.payload.name
        })
      })
    case "PLAYER_LEFT":
      // eslint-disable-next-line no-unused-vars
      let players = Object.assign({}, state.players)
      delete players[action.payload.id]
      return Object.assign(state, { players })
    case "ADVANCE_QUESTION":
      return Object.assign(state, { round: action.payload })
    default:
      return state
  }
}

const devTools =
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()

const store = devTools
  ? createStore(reducer, initialState, devTools)
  : createStore(reducer, initialState)

if (typeof window !== "undefined") {
  window.store = store
}
module.exports = {
  store
}
