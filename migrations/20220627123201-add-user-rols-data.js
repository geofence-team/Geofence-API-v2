'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("roles", [
      {
        name: 'ADMIN',
        description: "System Adminitrator",
      },
      {
        name: 'MANAGER',
        description: "School Manager",
      },
      {
        name: 'TEACHER',
        description: "School Teacher",
      },
      {
        name: 'DRIVER',
        description: "Driver/Parent",
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    
    let delAdmin = await queryInterface.bulkDelete("roles", {
      name: "ADMIN"
    });
    let delManager = await queryInterface.bulkDelete("roles", {
      name: "MANAGER"
    });
    let delTeacher = await queryInterface.bulkDelete("roles", {
      name: "TEACHER"
    });
    let delDriver = await queryInterface.bulkDelete("roles", {
      name: "DRIVER"
    });
    return Promise.all([delAdmin,delManager,delTeacher,delDriver])
  }
};
