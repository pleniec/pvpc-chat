module.exports = function(sequelize) {
  var Sequelize = require('sequelize');

  Conversation = sequelize.define('conversation', {
    key: Sequelize.STRING
  });

  return Conversation;
};
