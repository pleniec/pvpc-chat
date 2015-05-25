WebSocket = require 'ws'

webSocket = new WebSocket('ws://localhost:8080')

webSocket.on 'open', () ->
  webSocket.send JSON.stringify({zal: 'zal'})
