module.exports = function(app, models) {
  app.get('/users/:userId/conversations/:toUserId', function(req, res) {
    var conversationKey = [req.params.userId, req.params.toUserId].sort().join(':');
    models.Conversation
      .findOrCreate({where: {key: conversationKey}})
      .then(function(result) {
        var conversation = result[0];
        conversation.createMember({userId: req.params.userId});
        conversation.createMember({userId: req.params.toUserId});
        res.json({id: conversation.id});
      });
  });
};
