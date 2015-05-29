function websockets(io, models) {
  var connections = {};

  io.on('connection', function(connection) {
    var userId = connection.handshake.query.accessToken;
    connections[userId] = connection;
    connection.emit('authenticationSuccess');

    connection.on('message', function(message) {
    });

    connection.on('disconnect', function() {
      delete connections[userId];
    });
  });
}

module.exports = websockets;
