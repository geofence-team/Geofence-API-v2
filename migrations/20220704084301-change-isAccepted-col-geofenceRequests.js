'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return await queryInterface.changeColumn('geofencerequests', 'isAccepted', {
          type: Sequelize.BOOLEAN,
          allowNull: true,
      })
},

  async down (queryInterface, Sequelize) {
    return await queryInterface.changeColumn('geofencerequests', 'isAccepted', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  }
};
