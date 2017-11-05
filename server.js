const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

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

io.on('connection', function(client) {
  console.log('Got a client connection!');

  client.on('action', function(action) {
    console.log('Received an action:', action);
    client.broadcast.emit('action', action);
  });

  client.on('disconnect', function() {
    console.log('Client XXX signed off (TODO identify clients)');
  });
});
