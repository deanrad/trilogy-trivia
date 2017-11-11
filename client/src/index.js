import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./index.css"
import Student from "./components/Student"
import Presenter from "./components/Presenter"
import Remote from "./components/Remote"
import registerServiceWorker from "./registerServiceWorker"
import io from "socket.io-client" // var io = require('socket.io-client)
import { store } from "./store/" // var store = require('./store/').store
import eventCreators from "./store/actions"
import { connect, Provider } from "react-redux"

const url = "http://localhost:3001" // TODO switch this for prod
const socket = io(url)
window.socket = socket

socket.on("stateUpdate", function(state) {
  store.dispatch({
    type: "STATE_UPDATE",
    payload: state
  })
})

socket.on("identify", function(uuid) {
  // dispatch an action to put this in the store so we can have multiple tabs
  store.dispatch({
    type: "IDENTIFY_CLIENT",
    payload: uuid
  })
})

const justState = state => state
const dispatchOverSocket = eventCreators(socket)(store)
const cStudent = connect(justState, dispatchOverSocket)(Student)
const cPresenter = connect(justState, dispatchOverSocket)(Presenter)
const cRemote = connect(justState, dispatchOverSocket)(Remote)

const RoutedApp = () => (
  <Router>
    <Switch>
      {/* the most common case, a student joining will be the root  */}
      <Route exact path="/" component={cStudent} />
      <Route exact path="/student" component={cStudent} />
      <Route exact path="/live" component={cPresenter} />
      <Route exact path="/remote" component={cRemote} />
      <Route render={() => <h3>Not found</h3>} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <RoutedApp />
  </Provider>,
  document.getElementById("root")
)
if (process.env.NODE_ENV === "production") {
  registerServiceWorker()
}
