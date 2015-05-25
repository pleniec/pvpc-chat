WebSocket = require 'ws'

webSocket = new WebSocket('ws://pvpc-chat.herokuapp.com:8080')

webSocket.on 'open', () ->
  webSocket.on 'message', (message) ->
    console.log message

  console.log '??'
  webSocket.send 'siema ziom'
