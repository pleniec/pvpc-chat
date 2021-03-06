var server = require('http').Server(require('express')());
var io = require('socket.io')(server);

var amqp = require('amqp').createConnection({
  host: 'localhost',
  login: 'rabbitmq',
  password: 'QdRtHV5R9irvJDTG'
});
var redis = require('redis').createClient();

redis.on('ready', function() {
  amqp.on('ready', function() {
    console.log('chat server ready');
    io.on('connection', function(socket) {
      console.log('new connection');
      redis.get('access_token:' + socket.handshake.query.accessToken, function(error, userId) {
        if(!userId) {
          console.log('invalid access token, disconnecting');
          socket.emit('errorMessage', {text: 'invalid access token'});
          socket.disconnect();
          return;
        }

        socket.on('message', function(message) {
          console.log('new message - ' + JSON.stringify(message));
          message.userId = userId;
          amqp.publish('chat:messages', JSON.stringify(message));
          redis.smembers('chat:conversation:' + message.conversation, function(error, userIds) {
            if(userIds.indexOf(userId) != -1) {
              userIds.forEach(function(userId) {
                amqp.publish('chat:user:' + userId, JSON.stringify(message));
              });
            }
            else {
              socket.emit('errorMessage', {conversation: message.conversation,
                                           text: 'you are not authorized to access this conversation'});
            }
          });
        });

        amqp.queue('chat:user:' + userId, function(queue) {
          queue.subscribe(function(queueMessage) {
            socket.emit('message', JSON.parse(queueMessage.data.toString('utf8')));
          });
        });
      });
    });

    server.listen(8080);
  });
});
