WebSocketServer = require('ws').Server

class Server
  constructor: () ->
    @server = new WebSocketServer({port: process.env.PORT || 5000})

  bindEvents: () ->
    @server.on 'connection', (connection) ->
      connection.on 'message', (message) ->
        connection.send 'OK!'

module.exports = Server
