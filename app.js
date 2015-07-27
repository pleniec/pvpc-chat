var server = require('http').Server(require('express')());
var io = require('socket.io')(server);

var amqp = require('amqp').createConnection({
  host: 'localhost',
  login: 'rabbitmq',
  password: 'QdRtHV5R9irvJDTG'
});
var redis = require('redis').createClient();

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

        socket.on('message', function(message) {
          message.userId = userId;
          console.log('mesyndz: ' + JSON.stringify(message));
          redis.smembers('conversation:' + message.conversation, function(error, userIds) {
            if(userIds.indexOf(userId) != -1) {
              userIds.forEach(function(userId) {
                amqp.publish('chat:user:' + userId, JSON.stringify(message));
              });
            }
          });
        });

        console.log('valid access token');
        amqp.queue('chat:user:' + userId, function(queue) {
          queue.subscribe(function(queueMessage) {
            console.log('received message: ' + queueMessage.data.toString('utf8'));
            socket.emit('message', JSON.parse(queueMessage.data.toString('utf8')));
            //socket.emit('message', {text: 'moze'});
          });
        });
      });
    });

    server.listen(8080);
  });
});
