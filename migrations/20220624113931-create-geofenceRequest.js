"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("geofenceRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
      },
      geofenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "geofences",
          },
          key: "id",
        },
        allowNull: false,
      },
      isAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("geofenceRequests");
  },
};
