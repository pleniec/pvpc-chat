var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'chat', 'chat', {
  host: 'localhost',
  dialect: 'postgres'
});

Conversation = require('./conversation')(sequelize);
Member = require('./member')(sequelize);
Message = require('./message')(sequelize);

Conversation.hasMany(Member);
Conversation.hasMany(Message);

module.exports.Conversation = Conversation;
module.exports.Member = Member;
module.exports.Message = Message;

module.exports.sequelize = sequelize;
