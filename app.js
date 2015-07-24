var server = require('http').Server(require('express')());
var io = require('socket.io')(server);

var amqp = require('amqp').createConnection({
  host: 'localhost',
  login: 'rabbitmq',
  password: 'QdRtHV5R9irvJDTG'
});
var redis = require('redis').createClient();
var pvpc = require('./pvpc.js');

redis.on('ready', function() {
  console.log('redis ready');
  amqp.on('ready', function() {
    console.log('amqp ready');
    io.on('connection', function(socket) {
      console.log('connection');
      redis.get('access_token:' + socket.handshake.query.accessToken, function(error, userId) {
        if(!userId) {
          console.log('invalid access token');
          socket.disconnect();
          return;
        }

        console.log('valid access token');
        amqp.queue('chat:user:' + userId, function(queue) {
          queue.subscribe(function(queueMessage) {
            console.log('received message: ' + queueMessage.data.toString('utf8'));
            socket.emit('message', {text: queueMessage.data.toString('utf8')});
          });
        });

        socket.on('message', function(message) {
          redis.lrange('conversation:' + message.conversation, 0, -1, function(error, userIds) {
          });
        });
      });
    });

    server.listen(8080);
  });
});
