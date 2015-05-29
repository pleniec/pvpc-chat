module.exports = function(sequelize) {
  var Sequelize = require('sequelize');

  return sequelize.define('message', {
    userId: Sequelize.INTEGER,
    text: Sequelize.TEXT
  });
};
