Client = require('node-rest-client').Client;
Server = require 'socket.io'

server = new Server()
client = new Client({user: 'pvpc-secret', password: 'pefalpe987'})
sockets = {}
url = 'https://pvpc-core.herokuapp.com/api/private/users/by_access_token?access_token='

server.on 'connection', (socket) ->
  client.get url + socket.request._query.accessToken, (data, resp) ->
    if resp.statusCode == 200
      socket.userId = JSON.parse(data).user.id
      sockets[socket.userId] = socket
      socket.emit('connectionSuccess')

      socket.on 'message', (message) ->
        for userId, _ of sockets
          sockets[userId].emit 'message', Object.keys(sockets)

      socket.on 'disconnect', () ->
        delete sockets[socket.userId]
    else
      socket.disconnect()

server.listen(3000)

###
ws = require 'ws'
querystring = require 'querystring'
nodeRestClient = require 'node-rest-client'

server = new ws.Server({port: 3000})
client = new nodeRestClient.Client({user: 'pvpc-secret', password: 'pefalpe987'})
url = 'https://pvpc-core.herokuapp.com/api/private/users/by_access_token?access_token='
connections = {}

server.on 'connection', (connection) ->
  accessToken = querystring.parse(connection.upgradeReq.url.replace('/?', '')).accessToken

  client.get url + accessToken, (data, resp) ->
    if resp.statusCode == 200
      connection.userId = JSON.parse(data).user.id
      connections[connection.userId] = connection
    else
      connection.close()

  connection.on 'message', (message) ->
    for userId, _ of connections
      connections[userId].send('message from ' + connection.userId + '> ' + message)

  connection.on 'close', () ->
    delete connections[connection.userId]
###
