import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import {
  Live,
  Student,
  Remote,
  DataQuestionChooser,
  Results
} from "./components/";
import io from "socket.io-client";
import { store } from "./store/";
import eventCreators from "./store/actions";
import { connect, Provider } from "react-redux";
import { withRouter } from "react-router-dom";

const url =
  process.env.NODE_ENV === "production"
    ? document.location.href.replace(/\/\w+$/, "") // get rid of path
    : "http://localhost:3001";

const socket = io(url);
window.socket = socket;

socket.on("stateUpdate", function(state) {
  store.dispatch({
    type: "STATE_UPDATE",
    payload: state
  });
});

socket.on("identify", function(uuid) {
  // dispatch an action to put this in the store so we can have multiple tabs
  store.dispatch({
    type: "IDENTIFY_CLIENT",
    payload: { clientId: uuid }
  });
});

const justState = state => {
  // stay out of react router's way
  state._history = state.history;
  return state;
};
const dispatchOverSocket = eventCreators(socket)(store);
const cStudent = connect(justState, dispatchOverSocket)(Student);
const cLive = connect(justState, dispatchOverSocket)(Live);
const cRemote = connect(justState, dispatchOverSocket)(Remote);
const cDataQuestionChooser = withRouter(
  connect(justState, dispatchOverSocket)(DataQuestionChooser)
);
const cResults = connect(justState, dispatchOverSocket)(Results);

const RoutedApp = () => (
  <Router>
    <Switch>
      {/* the most common case, a student joining will be the root  */}
      <Route exact path="/" component={cStudent} />
      <Route exact path="/student" component={cStudent} />
      <Route exact path="/live" component={cLive} />
      <Route exact path="/remote" component={cRemote} />
      <Route exact path="/questions" component={cDataQuestionChooser} />
      <Route exact path="/results" component={cResults} />
      <Route render={() => <h3>Not found</h3>} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <RoutedApp />
  </Provider>,
  document.getElementById("root")
);
