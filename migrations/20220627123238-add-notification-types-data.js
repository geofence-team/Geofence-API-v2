'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("notificationTypes", [
      {
        name: 'IN',
        description: "When vehicle reaches the school",
      },
      {
        name: 'OUT',
        description: "When vehicle leaves the school",
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    
    let delIn = await queryInterface.bulkDelete("notificationTypes", {
      name: "IN"
    });
    let delOut = await queryInterface.bulkDelete("notificationTypes", {
      name: "OUT"
    });
    return Promise.all([delIn,delOut])
  }
};