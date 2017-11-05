import React, { Component } from 'react';
import logo from './trilobyte.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Trilobytes!</h2>
        </div>
        <p className="App-intro">
          This will be the player screen, which will host the Q/A component.
        </p>
      </div>
    );
  }
}

export default App;
