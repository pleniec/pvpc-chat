class PvpcCore
  constructor: (url) ->
    @url = url

  userFromAccessToken: (accessToken) ->
    {id: Math.floor(Math.random() * (1000 - 1) + 1);, email: 'user@mail.com'}
