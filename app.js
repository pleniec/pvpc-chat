var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var models = require('./models');

models.sequelize.sync({force: true}).then(function() {
  require('./routes/conversations')(app, models)
  require('./routes/websockets')(io, models);
  server.listen(3000);
});
