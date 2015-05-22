Client = require('node-rest-client').Client;
Server = require 'socket.io'
MongoClient = require('mongodb').MongoClient

server = new Server()
client = new Client({user: 'pvpc-secret', password: 'pefalpe987'})
sockets = {}
pvpcCoreUrl = 'https://pvpc-core.herokuapp.com/api/private/users/by_access_token?access_token='
mongoUrl = 'mongodb://pvpc:321sraka@ds063168.mongolab.com:63168/pvpc-chat'

MongoClient.connect mongoUrl, (err, db) ->
  server.on 'connection', (socket) ->
    client.get pvpcCoreUrl + socket.request._query.accessToken, (data, resp) ->
      if resp.statusCode == 200
        socket.userId = JSON.parse(data).user.id
        sockets[socket.userId] = socket
        socket.emit('connectionSuccess')

        socket.on 'message', (message) ->
          for userId, _ of sockets
            sockets[userId].emit 'message', {from: socket.userId, message: message}

        socket.on 'disconnect', () ->
          delete sockets[socket.userId]
      else
        socket.disconnect()

server.listen(3000)
