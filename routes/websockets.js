function websockets(io, models) {
  var connections = {};

  io.on('connection', function(connection) {
    var userId = connection.handshake.query.accessToken;
    connections[userId] = connection;
    connection.emit('authenticationSuccess');

    connection.on('message', function(message) {
      models.Conversation
        .findOne({
          where: {id: message.conversationId},
          include: [
            {model: Member}
          ]
        })
        .then(function(conversation) {
          conversation.members.forEach(function(member) {
            if(connections[member.userId]) {
              connections[member.userId].send(message);
            }
          });
        });
    });

    connection.on('disconnect', function() {
      delete connections[userId];
    });
  });
}

module.exports = websockets;
