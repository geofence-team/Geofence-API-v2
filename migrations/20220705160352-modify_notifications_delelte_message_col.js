'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'notifications',
      'message',
     Sequelize.STRING
    );

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'notifications',
      'message',
     Sequelize.STRING
    );
  }
}