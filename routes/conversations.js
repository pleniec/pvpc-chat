module.exports = function(app, models) {
  app.get('/users/:userId/conversations/:toUserId', function(req, res) {
    var conversationKey = [req.params.userId, req.params.toUserId].sort().join(':');
    models.Conversation
      .findOrCreate({where: {key: conversationKey}})
      .then(function(conversations) {
        res.json(conversations[0]);
      });
  });
};
