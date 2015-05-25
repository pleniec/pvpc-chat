WebSocketServer = require('ws').Server

class Server
  constructor: () ->
    @server = new WebSocketServer({port: 8080})

  bindEvents: () ->
    @server.on 'connection', (connection) ->
      connection.on 'message', (message) ->
        connection.send 'OK!'

module.exports = Server
