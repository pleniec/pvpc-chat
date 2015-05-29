module.exports = function(sequelize) {
  var Sequelize = require('sequelize');

  return sequelize.define('message', {
    text: Sequelize.TEXT
  });
};
