const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const uuid = require('uuid');

const store = require('./store/').store;
const sendState = () => {
  const state = store.getState();
  io.emit('stateUpdate', state);
};

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

http.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

const clientById = new Set();
io.on('connection', function(client) {
  console.log('Got a client connection!');

  // Tell our store someone joined
  store.dispatch({ type: 'CONNECTION_ADDED' });

  const id = uuid.v4();
  client.on('join', function({ name }) {
    console.log(`${name} ${id} joined`);
    store.dispatch({
      type: 'PLAYER_JOINED',
      payload: {
        id,
        name
      }
    });

    client.emit('identify', id);
  });

  client.on('action', function(action) {
    console.log('Received an action:', action);
    store.dispatch(action);
  });

  client.on('disconnect', function() {
    console.log('Client signed off');
    store.dispatch({ type: 'CONNECTION_LEFT' });
    store.dispatch({
      type: 'PLAYER_LEFT',
      payload: {
        id
      }
    });
  });
});

// Every time an action comes through, tell everyone the new state
store.subscribe(function() {
  const state = store.getState();
  console.log('New state:', JSON.stringify(state, null, 2));
  sendState();
});
