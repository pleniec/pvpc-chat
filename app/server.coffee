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
