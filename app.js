var server = require('http').Server(require('express')());
var io = require('socket.io')(server);

var amqp = require('amqp').createConnection({host: 'localhost'});
var redis = require('redis').createClient();
var pvpc = require('./pvpc.js');

redis.on('ready', function() {
  amqp.on('ready', function() {
    io.on('connection', function(socket) {
      redis.get('access_token:' + socket.handshake.query.accessToken, function(error, userId) {
        if(!userId) {
          socket.disconnect();
          return;
        }
/*
        amqp.queue('chat:user:' + userId, function(queue) {
          queue.subscribe(function(message) {
            socket.emit('message', {message: message});
          });
        });

        socket.on('message', function(message) {
        });
*/
        socket.emit('news', {hello: 'world'});
        socket.on('my other event', function(data) {
          console.log(data);
        });
      });
    });

    server.listen(8080);
  });
});
