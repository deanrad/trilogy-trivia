import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Student from './components/Student';
import Presenter from './components/Presenter';
import Remote from './components/Remote';
import registerServiceWorker from './registerServiceWorker';

const RoutedApp = () => (
  <Router>
    <Switch>
      {/* the most common case, a student joining will be the root  */}
      <Route exact path="/" component={Student} />
      <Route exact path="/student" component={Student} />
      <Route exact path="/live" component={Presenter} />
      <Route exact path="/remote" component={Remote} />
      <Route render={() => <h3>Not found</h3>} />
    </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}
