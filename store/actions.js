const questions = require("../data/questions.json")

const nextQuestion = store => {
  let current = store.getState().round
  if (!current) return questions[0]
  let { prompt } = current || {}
  let idx = questions.findIndex(q => q.prompt == prompt)
  let nextIdx = idx + 1
  return questions[nextIdx]
}

// mapDispatchToProps
const eventCreators = socket => store => (/* dispatch */) => ({
  revealAnswer: () => {
    socket.emit("action", {
      type: "ANSWER_REVEAL",
      payload: {}
    })
  },
  answerQuestion: choice => {
    socket.emit("action", {
      type: "ANSWER_QUESTION",
      payload: {
        choice,
        player: localStorage.getItem("TrilobytesClientId")
      }
    })
  },
  advanceQuestion: () => {
    let question = nextQuestion(store)
    // TODO handle questions after the first
    socket.emit("action", {
      type: "ADVANCE_QUESTION",
      payload: Object.assign(question, { responses: [] })
    })
  },
  signIn: ({ id, name }) => {
    // note - not an 'action'
    socket.emit("join", {
      id,
      name
    })
  }
})

export default eventCreators
