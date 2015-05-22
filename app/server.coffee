ws = require 'ws'
querystring = require 'querystring'
PvpcCore = require './pvpcCore'

server = new ws.Server({port: 3000})
pvpcCore = new PvpcCore('nico')
users = {}

server.on 'connection', (connection) ->
  accessToken = querystring.parse(connection.upgradeReq.url.replace('/?', '')).accessToken
  user = pvpcCore.userFromAccessToken(accessToken)
  user.connection = connection
  users[user.id] = user

  connection.on 'message', (message) ->
    connection.send('fawr')

  connection.on 'close', () ->
    console.log 'fail'
