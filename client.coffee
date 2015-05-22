Client = require 'socket.io-client'

accessToken = process.argv[2]
client = new Client('ws://localhost:3000', {query: {accessToken: accessToken}})

client.on 'connectionSuccess', () ->
  client.emit 'message', 'zalzal'

client.on 'message', (message) ->
  console.log message

###
DNY5SGZzFyV6grCe13YN
JiU9ogiEx4ayfRz4aXJ5
###
