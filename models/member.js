module.exports = function(sequelize) {
  var Sequelize = require('sequelize');

  return sequelize.define('member', {
    userId: Sequelize.INTEGER
  });
};
